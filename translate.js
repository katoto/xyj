"use strict";
var getTranslate = function () {},
    setTranslate = function (e) {
        var a;
        a = {
            zh: {
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
                submitFail: "提交失败"
            },
            en: {
                gameName: "DARK WOOD",
                briefingTrader: "Briefing Trader",
                tabBuyTitle: "Buy",
                tabDrawTitle: "WITHDRAW",
                Recommended: "推荐奖励",
                chooseTeam: "Choose a Team",
                withdraw: "WITHDRAW",
                buyTip: "*The price of Gems will increase with the number of users purchased",
                drawTip: "*Minimum withdrawal amount: 10 ETH；Your rewards will be automatically withdrawn to your ETH account if the round ends",
                totalAward: "Your Rewards",
                rebate: "Rebate",
                withdrawAvailable: "你的金钻",
                yourGems: "Your Gems",
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
        $("#locale").text(t ? "EN" : "CN"), $("#locale").on("click", function () {
            localStorage.setItem("language", t ? "en" : "zh");
            setTranslate(a);
            e();
            // localStorage.setItem("language", t ? "en" : "zh"), setTranslate(a), e(), getTeamList(function (e) {
            //     var a = $(".team-container"),
            //         r = e.rows,
            //         n = getTranslate("teamDesc"),
            //         i = getTranslate("teamPics"),
            //         s = $(document.createDocumentFragment());
            //     a.empty();
            //     var u = getTranslate("jackpot"),
            //         c = getTranslate("reward");
            //     ["werewolf", "civilian", "witch", "hunter"].forEach(function (a, e) {
            //         var t = r.find(function (e) {
            //             return e.name === a
            //         });
            //         s.append($('\n                  <div class="team-wrapper' + (0 === e ? " team-wrapper--checked" : "") + "\" data-team='" + a + "'>\n                      <img src=\"./assets/images/" + i(e) + '.png" alt="" class="pic">\n                      <span class="desc">' + n(e) + "</span>\n                      <span>" + u + "\n                        <strong>" + t.pot + "%</strong>\n                      </span>\n                      <span>" + c + "\n                        <strong>" + t.dividend + "%</strong>\n                      </span>\n                  </div>"))
            //     }), a.append(s)
            // })
        });
        var r = $("[data-trans]");
        Array.prototype.forEach.call(r, function (e) {
            var a = e.getAttribute("data-trans");
            e.textContent = getTranslate(a)
        })
    }()
});