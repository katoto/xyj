window.onload = function () {
    // 渲染时间
    function renderTime (hour, min, second) {
        function formatTime (time) {
            return time < 10 ? '0' + time.toString() : time;
        }
        if (hour < 0) {
            $('.headtimer, .lottery_time p').text('游戏已结束');
            clearInterval(xyj._timer);
            xyj._timer = null;
            return;
        }
        $('.headtimer').text(formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(second));
        $('.lottery_time p').text(hour.toString() + '小时' + min.toString() + '分' + second.toString() + '秒');
    }

    // 根据time计算小时 分钟 秒数
    function calcTime (time) {
        var hour = Math.floor(time / 3600);
        var min = Math.floor((time - (hour * 3600)) / 60);
        var second = (time - (hour * 3600)) % 60;
        return [hour, min, second]
    }
    
    // 更新计数器
    function updateInterval (time) {
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
    function showMsg (msg) {
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
    function accMul (arg1, arg2) {
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

    // 渲染单价
    function renderPrice () {
        $('#eosCount').text('@ ' + accMul(xyj._keyNums, xyj._keyPrice).toString() + ' ETH')
    }


    // 获取Key单价
    function getBuyPrice () {
        xyj.getBuyPrice(function (error, price) {
            // console.log(price);
            if (error) {
                console.log(error);
            } else {
                xyj._keyPrice = price;
                renderPrice();
            }
        });
    }

    // 获取我的账号
    function getAccounts (fn) {
        xyj.getAccounts(function (error, account) {
            if (error) {
                console.log(error)
                fn(false)
            } else {
                console.log(account)
                fn(account)
            }
        })
    }

    // 获取邀请者账号
    function getAdviceHash () {
        // TODO: 邀请者账号
        return false
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------

    xyj._keyNums = 1

    // 获取合约剩余时间
    xyj.getTimeLeft(function (error, time) {
        if (error) {
            console.log(error);
        } else {
            updateInterval(time);
        }
    });



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
            'wukong': 1,
            'bajie': 2,
            'shaseng': 3
        }[team];
        xyj._team = teamId;
    });

    // 默认选钟唐僧队
    xyj._team = 0;

    getAccounts(function (account) {
        contractNet.getPlayerInfoByAddress(account, function () {
            console.log(arguments)
        })
    })

    $('.btn-buy').click(function () {
        getAccounts(function (account) {
            if (account) {
                // 购买Key，自己购买传0，通过邀请购买传邀请者账号
                xyj.buyXaddr(getAdviceHash() || '0', xyj._team.toString(), accMul(xyj._keyPrice, xyj._keyNums), function () {

                });
            } else {
                // TODO: 未登录
            }
        });
    });

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
}