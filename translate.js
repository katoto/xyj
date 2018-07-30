"use strict";
var getTranslate = function () {},
    setTranslate = function (e) {
        var a;
        a = {
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
                buyBtn: "Purchase with buyBtn",
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
        }[/^zh/.test(e) ? "zh" : "en"], getTranslate = function (e) {
            return a[e] || e
        }
    };
$(function () {
    ! function e() {
        var a = localStorage.language || window.navigator.language;
        setTranslate(a);
        var t = /^zh/.test(a);
        $("#locale").text(t ? "EN" : "CN")
        $("#locale").off('click').on("click", function () {
            localStorage.setItem("language", t ? "en" : "zh");
            setTranslate(a);
            e();
        });
        var r = $("[data-trans]");
        Array.prototype.forEach.call(r, function (e) {
            var a = e.getAttribute("data-trans");
            e.textContent = getTranslate(a)
        })
    }()
});