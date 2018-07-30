"use strict";
window.global_lan = 'zh';
var _ = null,
getTranslate = null,
setTranslate = function (e) {
    var a = {
        zh: {
            js_gloTitle:"这是最后的机会",
            js_gloTitle2:"快来西方取“金”！",
            js_team1:"悟空",
            js_team2:"唐僧",
            js_team3:"八戒",
            js_team4:"沙僧",
            js_time:"购买时间",
            js_teamName:'团队',
            js_dis_val:'分配总额',
            js_keys_val:'购钻总额',
            js_round:'回合 ',
            js_data:'统计',
            gameName: "造梦西游",
            briefingTrader: "实时成交",
            tabBuyTitle: "购买",
            tabDrawTitle: "提现",
            Recommended: "推荐奖励",
            chooseTeam: "选择团队",
            withdraw: "全部提现",
            buyTip: "*金钻的价格会根据更多用户的购买数量而不断增长",
            drawTip: "*提示：最低10个EOS起提，本轮结束自动提现至账户",
            totalAward: "你的收益",
            rebate: "分享奖励",
            withdrawAvailable: "你的金钻",
            yourGems: "你的金钻",
            remainingTime: "本轮剩余时间：",
            totalJackpot: "奖励池总数",
            recentBuyer: "最后购买者：",
            buyBtn: "使用 ETH 购买",
            round: function (e) {
                return "第" + (["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"][e - 1] || e) + "轮"
            },
            buy: "买",
            draw: "提",
            jackpot: "底池：",
            reward: "分红：",
            teamDesc: function (e) {
                return ["大部分收益", "平均分配", "以贪婪为食", "独立战斗"][e]
            },
            tradingRules: "交易规则",
            betweenTime: function (e, a, t) {
                return e + "小时" + a + "分" + t + "秒"
            },
            teamPics: function (e) {
                return ["werewolf", "civilian", "witch", "hunter"][e]
            },
            auth: "授权",
            gameEnd: "本轮游戏即将结束",
            pleaseLogin: "请先授权",
            purchasing: "购买中...",
            purchaseSuccess: "购买成功",
            purchaseFail: "购买失败",
            purchaseEmpty: "购买数量不能为空",
            moreThan10: "大于 10 个 EOS 才能提现",
            confirmUpdateAuth: "确认更新权限?",
            withdrawal: "提现中...",
            withdrawFail: "提现失败",
            withdrawSuccess: "提现成功",
            exiting: "退出中...",
            exitSuccess: "退出授权成功",
            exitFail: "退成授权失败",
            submitSuccess: "提交成功",
            submitFail: "提交失败",
            js_keys:'金钻',
            js_buyLink:'注册一个专属的推广代号',
            js_linkMsg:'购买一个代号来生成推广链接，并直接分享高达10%的佣金',
            js_morePeop:'让更多人参与造梦西游游戏',
        },
        en: {
            js_morePeop:'让更多人参与造梦西游游戏',
            js_linkMsg:'Buy referral links to invite friends,you can get 10% of your friends\' investment!',
            js_buyLink:'Buy a Link',
            js_keys:'Diamond',
            js_gloTitle:"Dream of Your West Journey",
            js_gloTitle2:"Journey to Your Best Diamond",
            js_team1:"Sun Wukong",
            js_team2:"Tang Sanzang",
            js_team3:"Zhu Bajie",
            js_team4:"Sha Wujing",
            js_time:"Cumulative Time",
            js_dis_val:'Referral Reward',
            js_keys_val:'Total Diamond',
            js_teamName:'Team',
            js_round:'Round ',
            js_data:'Data',
            gameName: "Dream of the West Journey",
            briefingTrader: "Briefing Trader",
            tabBuyTitle: "Buy",
            tabDrawTitle: "Withdraw",
            Recommended: "Referrals",
            chooseTeam: "Choose a Team",
            withdraw: "WITHDRAW",
            buyTip: "*The price of Gems will increase with the number of users purchased",
            drawTip: "*Minimum withdrawal amount: 10 ETH；Your rewards will be automatically withdrawn to your ETH account if the round ends",
            totalAward: "Your Rewards",
            rebate: "Rebate",
            withdrawAvailable: "Your Diamond",
            yourGems: "Your Diamond",
            remainingTime: "Round 1 Contract will drain in :",
            totalJackpot: "Jackpot",
            recentBuyer: "Recent Buyer:",
            buyBtn: "Pay in ETH",
            round: function (e) {
                return "Round " + e
            },
            buy: "BUY",
            draw: "DRAW",
            jackpot: "Jackpot:",
            reward: "Reward:",
            teamDesc: function (e) {
                return ["Get most of the Reward", "Balanced Reward", "Feeding on the Greed of others", "Fight Alone"][e]
            },
            tradingRules: "Trading Rules",
            betweenTime: function (e, a, t) {
                return padStart(e) + ":" + padStart(a) + ":" + padStart(t)
            },
            teamPics: function (e) {
                return ["werewolf", "civilian", "witch", "hunter"][e] + ".en"
            },
            auth: "Login with Scatter",
            gameEnd: "Round 1 is coming to an END",
            pleaseLogin: "Please Login",
            purchasing: "During Purchase",
            purchaseSuccess: "Purchase Success ",
            purchaseFail: "Failed Purchase",
            purchaseEmpty: "The number of purchases cannot be empty",
            moreThan10: "The withdrawal amount MUST be more than 10 EOS",
            confirmUpdateAuth: "Confirm Update Permissions?",
            withdrawal: "Withdrawal..",
            withdrawFail: "Withdraw Failure",
            withdrawSuccess: "Withdraw successfully",
            exiting: "Exiting...",
            exitSuccess: "You have Exited Successfully ",
            exitFail: "Opt Out Failed",
            submitSuccess: "Submitted successfully",
            submitFail: "Submission Failed"
        }
    }[/^zh/.test(e) ? "zh" : "en"],
    lang = {
        '您已成功购买{0}个金钻': 'You have bought {0} diamond.',
        '您已成功购买{0}个金钻 ': 'You have bought {0} diamonds.',
        '{0}已成功购买{1}个金钻': '{0} bought {1} diamond',
        '{0}已成功购买{1}个金钻 ': '{0} bought {1} diamonds',
        '有小伙伴已成功购买{0}个金钻': '{0} diamond has fallen into someone\'s wallet.',
        '有小伙伴已成功购买{0}个金钻 ': '{0} diamonds have fallen into someone\'s wallet.',
        '有小伙伴已成功购买专属的推广代号': 'One referral link has been bought.',
        '全体起立，欢迎{0}成功购买专属的推广代号': '{0} just got exclusive referral chance.',
        '您已成功提现{0}ETH!': '{0} ETH Withdrawal Successful!',
        '有小伙伴已成功提现{0}ETH!': 'Someone has withdrawn {0} ETH!',
        '{0}已成功提现{1}ETH!': '{0} has withdrawn {1} ETH!',
        '请注意，新一轮的游戏准备开始': 'Attention! Another round of the game is ready to start!',
        '您已成功激活新一轮的游戏，激活游戏不会花费您的ETH，快来马上买钻取“金”吧': 'You\'ve just activated a new round for free! Buy diamonds and start your journey now!',
        '游戏已结束': 'Game Finished',
        '立即上路取"金"': 'Buy diamonds and start your journey now！',
        '快速购买一颗金钻，赢得超级奖池！': 'Buy one diamond to hit the pool！',
        '小时': 'h ',
        '分': 'min ',
        '秒': 's ',
        '清先登陆您的Metamask钱包': 'Your Metamask did not log in',
        '请输入正确的金钻数量': 'Please enter the correct amount',
        '已取消购买金钻': 'Purchase Cancelled',
        '下单成功': 'Order Successful',
        '已取消注册推广代号': 'Registration Cancelled',
        '输入的推广代号不符合规则': 'Please enter the correct referral link.',
        '提现已取消': 'Withdrawal Cancelled',
        '让更多人参与造梦西游游戏': 'Invite more friends to the game.',
        '1金钻': '1 Diamond',
        '大部分收益': 'Sooner buy, better joy.',
        '平均分配': 'Less risky choice.',
        '以贪婪为食': 'To satisfy the greedy desires.',
        '独立战斗': 'Winner takes the most',
        '底池：': 'Diamond Pool',
        '分红：': 'Dividend',
        '合约地址': 'Smart Contract',
        '1 金钻': '1 Diamond',
        '在区块链上记录你的名字': 'Graffiti your name on the Blockchain',
        '随机': 'Random',
        '名称必须遵循以下规则：': 'Names must follow these rules:',
        '- 必须是唯一的': '-Must be unique',
        '数据库唯一的名称': 'database of unique names',
        '-32个字符或更少': '-32 Characters or Less',
        '-A-Z（小写）': '-A-Z (lowercase)',
        '-名称不能只是数字，但允许使用数字': '-Name cannot be just numbers, but numbers are allowed',
        '- 没有特殊字符': '-No special characters',
        '- 字符之间不能有多个空格': '-No more than one space between characters',
        '名称是永久性的。 但只有您最近的名字才会显示在排行榜/游戏用户界面上。 您可以拥有任意数量的名称。': 'Names are yours permanently (for vanity URLS). But only your most recent name will show up on the leaderboard/game UI. You can own as many names as you\'d like.',
        '花费0.01ETH购买': 'Purchase for 0.01 ETH',
        '现在购买1颗金钻，您将成为新1轮的第1个投资者！': 'Buy 1 diamond now and you will be the first investor in the new round!',
        "简易教程": "Easy Play",
        '复制地址': 'copy',
        '钱包推荐地址：': 'Wallet Referral',
        '匿名推荐地址：': 'Anyonmous Referral',
        '名字推荐地址：': 'Vanity Referral',
        ' 个': ''
    };
    getTranslate = function (e) {
        console.log(e)
        return a[e] || (localStorage.getItem('language') === 'zh' ? e : lang[e]) || e
    };
    _ = function () {
        let string = arguments[0] || ''
        let thisString = a[string] || lang[string] || string

        if (arguments.length > 1) {
            for (let index = 1; index < arguments.length; index++) {
                thisString = thisString.replace(new RegExp('\\{' + (index - 1) + '\\}', 'g'), arguments[index])
            }
        }
        return localStorage.getItem('language') === 'zh' ? arguments[0] : thisString
    };
};

$(function () {
    (function e() {
        window.global_lan = localStorage.language || window.navigator.language;
        setTranslate(global_lan);
        var t = /^zh/.test(global_lan);
        $("#locale").text(t ? "EN" : "CN");
        $('body').addClass(!t ? "EN" : "CN");
        $("#locale").off('click').on("click", function () {
            localStorage.setItem("language", t ? "en" : "zh");
            setTranslate(global_lan);
            window.location.reload();
            // e();
        });
        var r = $("[data-trans], [placeholder]");
        Array.prototype.forEach.call(r, function (e) {
            var text = e.getAttribute('data-trans');
            var placeholder = e.getAttribute('placeholder')
            if (text) {
                e.textContent = getTranslate(text);
            } else if (placeholder) {
                e.setAttribute('placeholder', getTranslate(placeholder));
            }
        });
    })()
});