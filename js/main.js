window.refreshPersonInfo = null;
window.refreshInfo = null;
window.refreshTime = null;
window.onload = function () {


    // 购买、提现、推荐奖励 tab 点击事件
    $('.team-grid .tabs .tab-title span').click(function () {
        $('.team-grid .tabs .tab-title span').removeClass('active');
        $(this).addClass('active');
        $('.team-grid .tabs .tab-content').removeClass('active');
        $('.team-grid .tabs .tab-content').eq($(this).index()).addClass('active');
    });

    // 回合、团队、统计 tab 点击事件
    $('.list-content .tabs .tab-title span').click(function () {
        $('.list-content .tabs .tab-title span').removeClass('active');
        $(this).addClass('active');
        $('.list-content .tabs .tab-content').removeClass('active');
        $('.list-content .tabs .tab-content').eq($(this).index()).addClass('active');
    });

    function showLoading () {
        $('.buy-loading').show();
        $('html body').addClass('stop');
    }

    function hideLoading () {
        $('.buy-loading').hide();
        $('html body').removeClass('stop');
    }


    // 格式化金额
    function numberComma(source, length = 3) {
        source = String(source).split('.')
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
        return source.join('.')
    }

    function formatUSDT(eth) {
        var usd = 464.68;
        return numberComma(accMul(usd, eth).toFixed(2))
    }

    function getDefaultAdvisor() {
        return '0'
    }

    // 关闭创建弹窗
    function closeVanity() {
        $('#vanity').removeClass('show');
    }

    // 渲染时间
    function renderTime(hour, min, second) {
        function formatTime(time) {
            return time < 10 ? '0' + time.toString() : time;
        }

        if (hour < 0) {
            $('.headtimer, .lottery_time p, header .lottery_time').text('游戏已结束');
            clearInterval(xyj._timer);
            xyj._timer = null;
            return;
        }
        $('.headtimer, header .lottery_time').text(formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(second));
        $('.lottery_time p').text(hour.toString() + '小时' + min.toString() + '分' + second.toString() + '秒');
    }

    // 根据time计算小时 分钟 秒数
    function calcTime(time) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor((time - (hour * 3600)) / 60);
        var second = (time - (hour * 3600)) % 60;
        return [hour, min, second]
    }

    // 更新计数器
    function updateInterval(time) {
        if (xyj._timer) {
            clearInterval(xyj._timer);
        }
        xyj._time = time;
        xyj._timer = setInterval(function () {
            var timeTime = calcTime(xyj._time)
            renderTime(timeTime[0], timeTime[1], timeTime[2]);
            xyj._time--;
        }, 1000);
    }

    // 播报弹窗
    function showMsg(msg) {
        if (xyj._msgTimer) {
            // 当前存在播报
        } else {
            // 当前没有播报
            $('.pop-success').text(msg)
            $('.pop-success').addClass('show')
            xyj._msgTimer = setTimeout(function () {
                $('.pop-success').removeClass('show')
            }, 6000)
        }
    }

    // 浮点数乘法
    function accMul(arg1, arg2) {
        let m = 0
        let s1 = arg1.toString()
        let s2 = arg2.toString()
        try {
            m += s1.split('.')[1].length
        } catch (e) {
        }
        try {
            m += s2.split('.')[1].length
        } catch (e) {
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }

    function accDiv(arg1, arg2) {
        let t1 = 0
        let t2 = 0
        let r1
        let r2
        try {
            t1 = arg1.toString().split('.')[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split('.')[1].length
        } catch (e) {
        }
        r1 = Number(arg1.toString().replace('.', ''))
        r2 = Number(arg2.toString().replace('.', ''))
        return (r1 / r2) * Math.pow(10, t2 - t1)
    }

    function formatNum8(num) {
        return accDiv(Math.floor(accMul(Number(num), Math.pow(10, 8))), Math.pow(10, 8));
    }

    function formatNum4(num) {
        return accDiv(Math.floor(accMul(Number(num), Math.pow(10, 4))), Math.pow(10, 4));
    }

    function formatNum3(num) {
        return accDiv(Math.floor(accMul(Number(num), Math.pow(10, 3))), Math.pow(10, 3));
    }

    function formatNum2(num) {
        return accDiv(Math.floor(accMul(Number(num), Math.pow(10, 2))), Math.pow(10, 2));
    }

    // 渲染单价
    function renderPrice() {
        var price = xyj._keyPrice;
        price = formatNum8(price);
        $('#ethCount').text('@ ' + accMul(xyj._keyNums, price).toString() + ' ETH');
    }


    // 获取Key单价
    function getBuyPrice(fn) {
        xyj.getBuyPrice(function (error, price) {
            // console.log(price);
            if (error) {
                console.log(error);
            } else {
                xyj._keyPrice = price;
                fn && fn();
                renderPrice();
            }
        });
    }

    // 获取我的账号
    function getAccounts(fn) {
        xyj.getAccounts(function (error, account) {
            xyj._account = account;
            if (error || account === '') {
                console.log(error);
                alertify.alert('您的metamask未登录');
            } else {
                console.log(account);
                fn(account);
            }
        })
    }

    // 获取邀请者账号
    function getAdviceHash() {
        let str = window.location.pathname.slice(1);
        var type;
        if (str === '') {
            type = 'addr';
            str = getDefaultAdvisor();
        } else if (str.length > 32) {
            // addr
            type = 'addr';
        } else if (!isNaN(Number(str))) {
            // id
            type = 'id';
            str = Number(str);
        } else {
            // name
            type = 'name';
        }
        return {
            type: type,
            str, str
        }
    }

    function getRegisterName() {
        return $.trim($('#nameInput').val());
    }

    function isVerifyName(name) {
        var regaz = /^[a-z0-9\-\s]+$/;
        var regonlyNum = /^[0-9]+$/;
        return name.length <= 32 && regaz.test(name) && !regonlyNum.test(name) && name.indexOf('  ') === -1;
    }

    function getRandomName() {
        var getRandomKey = function (list) {
            return Math.floor(Math.random() * list.length);
        }
        var nouns = ["ninja", "truce", "harj", "finney", "szabo", "gwei", "laser", "justo", "satoshi", "mantso", "3D", "inventor", "theShocker", "aritz", "sumpunk", "cryptoknight", "randazz", "kadaz", "daok", "shenron", "notreally", "thecrypt", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];

        var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "harjd", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];

        return nouns[getRandomKey(nouns)] + ' ' + adjectives[getRandomKey(adjectives)];
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------

    xyj._keyNums = 1

    window.refreshTime = function () {
        // 获取合约剩余时间
        xyj.getTimeLeft(function (error, time) {
            if (error) {
                console.log(error);
            } else {
                updateInterval(time);
            }
        });
    };
    window.refreshTime();


    $('#count').on('input', function () {
        var keyNums = Number($(this).val())
        if (keyNums === 0 || isNaN(keyNums)) {
            xyj._keyNums = 1;
        } else {
            xyj._keyNums = keyNums;
        }
        renderPrice();
    })

    // Key输入框事件
    $('#count').keyup(function () {
        var keyNums = Number($(this).val())
        if (keyNums === 0 || isNaN(keyNums)) {
            xyj._keyNums = 1;
        } else {
            xyj._keyNums = keyNums;
        }
        renderPrice();
    });

    // 增加投注Key点击事件
    $('.count-container').on('click', '.count-wrapper', function () {
        var keyNums = Number($(this).attr('data-num'));
        if (!(keyNums === 0 || isNaN(keyNums))) {
            xyj._keyNums = xyj._keyNums + parseInt(keyNums, 10);
            $('#count').val(xyj._keyNums);
            renderPrice();
        }
    });

    getBuyPrice();
    // 实时刷新Key单价
    xyj._keyPriceTimer = setInterval(function () {
        getBuyPrice();
    }, 10000);

    // 选择队伍点击事件
    $('.team-container').on('click', '.team-wrapper', function () {
        $('.team-wrapper').removeClass('team-wrapper--checked');
        $(this).addClass('team-wrapper--checked');
        var team = $(this).attr('data-team');
        var teamId = {
            'shifu': 0,
            'wukong': 2,
            'bajie': 3,
            'shaseng': 1
        }[team];
        xyj._team = teamId;
    });

    // 默认选钟唐僧队
    xyj._team = 2;

    window.refreshPersonInfo = function () {
        // 渲染邀请信息和个人盈利
        getAccounts(function (account) {
            xyj.getPlayerInfoByAddress(account, function (error, data) {
                $('.js_noid, .js_hasid').addClass('hide');
                if (error) {
                    return
                }
                console.log(data)
                if (data && data.inviteName !== '') {
                    // 有推广代号
                    $('.js_hasid').removeClass('hide');
                    $('#mylink').text('http://xyj/' + account);
                    $('#idlink').text('http://xyj/' + (data.id === '0' ? '' : data.id));
                    $('#namelink').text('http://xyj/' + data.inviteName);
                    xyj._inviteName = data.inviteName;
                } else {
                    // 没有推广代号
                    $('.js_noid').removeClass('hide');
                }
                $('.list-content .share-award').text(data.shareEarn.toString() + ' ETH');
                $('.team-grid .share-award').text(data.shareEarn.toString());
                $('.list-content .owner-keys').text(data.keys.toString() + ' 个');

                getBuyPrice(function () {
                    $('.team-grid .js_your_key').text(Number(data.keys));
                });

                $('.list-content .total-award').text(data.totalEarn.toString() + ' ETH');
                $('.round-list .total-award-usdt').text('= ' + formatUSDT(data.totalEarn));
                $('.team-grid .total-award-usdt').text('= ' + formatUSDT(data.totalEarn));
                $('.team-grid .total-award').text(data.totalEarn.toString());
            });
        });
    };
    window.refreshPersonInfo();


    $('.btn-buy, .js_buy').click(function () {
        var isJSBuy = $(this).hasClass('js_buy');
        getAccounts(function (account) {
            if (account) {
                // 购买Key，自己购买传0，通过邀请购买传邀请者账号
                showLoading();
                var data = getAdviceHash();
                var fuc = {
                    id: xyj.buyXid,
                    addr: xyj.buyXaddr,
                    name: xyj.buyXname
                }[data.type]
                fuc(data.str, Number(xyj._team), accMul(xyj._keyPrice, isJSBuy ? 1 : xyj._keyNums), function (error, data) {
                    // TODO: 购买成功后
                    hideLoading();
                    if (error) {
                        alertify.error('购买Key已取消');
                    } else {
                        alertify.success('下单成功');
                    }
                });
            }
        });
    });


    window.refreshInfo = function () {
        // 奖池和团队数据
        xyj.getCurrentRoundInfo(function (error, data) {
            if (error) {
                return
            }
            console.log(data)
            getBuyPrice(function () {
                console.log(data)
                $('.banner .msg3, .total_prize_pool').text(formatNum4(data.currPot).toString());
                $('.list-content .js_wukong').text(formatNum4(data.sneks_2).toString());
                $('.list-content .js_shifu').text(formatNum4(data.whales_0).toString());
                $('.list-content .js_bajie').text(formatNum4(data.bulls_3).toString());
                $('.list-content .js_shaseng').text(formatNum4(data.bears_1).toString());


                $('.total-usdt').text('= ' + formatUSDT(data.currPot) + ' USDT');
                console.log(data.purchasedTime, formatNum2(data.purchasedTime))
                $('.js_year').text(data.purchasedTime > 1 ? formatNum2(data.purchasedTime).toString() : formatNum4(data.purchasedTime).toString());
                $('.js_second').text(numberComma(data.purchasedSeconds));
                if (data.lastBuyName && data.lastBuyName !== '') {
                    $('.round-list .winner').removeClass('hide');
                    $('.round-list .winner .account').text(data.lastBuyName);
                }
            })
        });
    };
    window.refreshInfo();


    xyj.getRound(function (error, data) {
        if (error) {
            return;
        }
        console.log(data);
        $('.js_keys_value').text(formatNum3(data.totalEth));
        $('.js_keys_usdt').text('≙ ' + formatUSDT(data.totalEth));
        $('.js_dis_value').text(formatNum3(data.distributionEth));
        $('.js_dis_usdt').text('≙ ' + formatUSDT(data.distributionEth));
    })


    // 新建名字 按钮点击事件
    $('.js_buyceo').click(function () {
        if (xyj._account && xyj._account !== '') {
            $('#vanity').addClass('show');
            $('#nameInput').val('');
        } else {
            alertify.alert('您的metamask未登录');
        }
    });

    // 创建名字弹窗关闭事件
    $('#vanity .col-auto').click(closeVanity);

    // 创建名字点击事件
    $('#namePurchase').click(function () {
        getAccounts(function (account) {
            if (account) {
                var data = getAdviceHash();
                var name = getRegisterName();
                if (isVerifyName(name)) {
                    showLoading();
                    var fuc = {
                        id: xyj.registerNameXID,
                        addr: xyj.registerNameXaddr,
                        name: xyj.registerNameXname
                    }[data.type]
                    fuc(name, data.str, function (error) {
                        // TODO: 购买名字成功后
                        hideLoading();
                        if (error) {
                            alertify.error('注册名字已取消');
                        } else {
                            closeVanity();
                            alertify.success('下单成功');
                        }
                        
                    });
                } else {
                    alertify.alert('输入的名字不符合规则');
                }
            }
        });
    });

    // 随机数点击事件
    $('#randomName').click(function () {
        $('#nameInput').val(getRandomName());
    });

    // 提现点击事件
    $('.js_withdraw').click(function () {
        if (xyj._account && xyj._account !== '') {
            xyj.withdraw(function (error, res) {
                console.log('提现', error, res)
            })
        } else {
            alertify.alert('您的metamask未登录');
        }
    });

    $('.js_share').click(function () {
        $('#sharing-rewards span').eq(2).click();
        if (!(xyj._account && xyj._account !== '')) {
            alertify.alert('您的metamask未登录');
        }
    })

    new ClipboardJS('.js_copy_btn');
}