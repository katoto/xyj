"use strict";
var _slicedToArray = function (t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return function (t, e) {
            var a = [],
                n = !0,
                r = !1,
                o = void 0;
            try {
                for (var i, c = t[Symbol.iterator](); !(n = (i = c.next()).done) && (a.push(i.value), !e || a.length !== e); n = !0);
            } catch (t) {
                r = !0, o = t
            } finally {
                try {
                    !n && c.return && c.return()
                } finally {
                    if (r) throw o
                }
            }
            return a
        }(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    },
    INTERVAL_TIMER = 5e3,
    showAlert = function () {
        var a = void 0;
        return function (t) {
            var e = $(".alert.show");
            e.length ? (clearTimeout(a), e.text(t)) : e = $("#alert").addClass("show").text(t), a = setTimeout(function () {
                e.removeClass("show")
            }, 3e3)
        }
    }(),
    debounce = function (n, r) {
        var o = void 0;
        return function () {
            for (var t = arguments.length, e = Array(t), a = 0; a < t; a++) e[a] = arguments[a];
            clearTimeout(o), o = setTimeout(function () {
                n.apply(void 0, e)
            }, r)
        }
    },
    getBetweenTime = function (t, e) {
        var a = ((216e5 < Math.abs(1e3 * t - Date.now()) ? 216e5 : Math.abs(1e3 * t - Date.now())) / 1e3).toFixed(0),
            n = Math.floor(a / 3600),
            r = Math.floor((a - 3600 * n) / 60),
            o = a - (3600 * n + 60 * r);
        return e ? padStart(n) + ":" + padStart(r) + ":" + padStart(o) : getTranslate("betweenTime")(n, r, o)
    },
    padStart = function (t) {
        return String(t).padStart(2, 0)
    },
    gemToEos = function (t) {
        return totalKeys <= 5767665 ? .18 * t : (.18 + 2e-5 * (totalKeys - 5767665)) * t
    },
    formatTime = function (t) {
        var e = new Date(1e3 * t);
        return [e.getFullYear() + "." + padStart(e.getMonth() + 1) + "." + padStart(e.getDate()), (e.getHours() < 10 ? "0" + e.getHours() : e.getHours()) + ":" + padStart(e.getMinutes()) + ":" + padStart(e.getSeconds())]
    },
    isEarly = !1,
    award = 0,
    ownerKeys = 0,
    totalKeys = 0;
$(function () {
    function u() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1,
            e = $("#eosCount");
        isEarly && 1e4 < +t + ownerKeys && showAlert("早鸟轮额度上限 50.0000 EOS 人"), e.text("@ " + gemToEos(t).toFixed(4) + " EOS")
    }
    $("#auth").on("click", function () {
        localStorage.eos_account ? logout() : fomoScatter()
    });
    // var n = $(".tabs");
    // n.each(function () {
    //     $(this).on("click", function (t) {
    //         var e = t.target;
    //         console.log(e);

    //         var r = $(this).find(".tab-title span");
    //         $(this).find(".tab-title span.active").removeClass("active");
    //         var a = r.index(e);
    //         $(e).addClass("active");
    //         $(this).find(".tab-content.active").removeClass("active");
    //         $(this).find(".tab-content").eq(a).addClass("active")
    //     });
    // })
    var n = $(".tabs");
    n.each(function () {
        $(this).find('.tab-title span').on('click', function () {
            var _index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active')
            $(this).parent().siblings().removeClass('active').eq(_index).addClass('active')
        })
    })
    var s = $(".team-container");
    s.on("click", ".team-wrapper", function (t) {
        for (var e = t.target;
            "DIV" !== e.nodeName;) e = e.parentNode;
        var a = s.find(".team-wrapper"),
            n = a.index(e);
        s.find(".team-wrapper--checked").removeClass("team-wrapper--checked"), $(a[n]).addClass("team-wrapper--checked")
    });
    var o = $(".count-container"),
        i = $("#count");
    o.on("click", ".count-wrapper", function (t) {
        for (var e = t.target;
            "DIV" !== e.nodeName;) e = e.parentNode;
        var a = [10, 20, 50, 100, 200][o.find(".count-wrapper").index(e)],
            n = +i.val() + a;
        i.val(n), u(n)
    }), i.on("input", debounce(function (t) {
        var e = t.target.value;
        return +e <= 0 ? ($(t.target).val(null), showAlert("宝石数量不能小于0")) : /\./gi.test(e) ? showAlert("数量必须为正整数") : void u(e || 1)
    }, 300));
    var t = $("#share-btn"),
        c = $("#share-layer");
    t.click(function () {
        c.toggle(), c.is(":visible") ? $("html,body").css({
            // overflow: "hidden"
        }) : $("#code-layer").is(":visible") ? $("html,body").css({
            // overflow: "hidden"
        }) : $("html,body").css({
            // overflow: "auto"
        })
    }), c.click(function (t) {
        var e = $(".layer-content"),
            a = $(".layer-content")[0],
            n = t.target;
        e && a && (a === n || $.contains(a, n) || (c.fadeOut(), $("html,body").css({
            overflow: "auto"
        })))
    }), $("#code-layer .close-btn").click(function () {
        $("#code-layer").fadeOut(), $("html,body").css({
            overflow: "auto"
        })
    }), $(".code-btn").click(function () {
        var t = $("#code-val").val();
        regsharer(t), $("#code-layer").fadeOut(), $("html,body").css({
            overflow: "auto"
        })
    }), $("#rule-layer .close-btn").click(function () {
        $("#rule-layer").fadeOut(), $("html,body").css({
            overflow: "auto"
        })
    }), $(".rule-btn").click(function () {
        $("#rule-layer").fadeIn(), $("html,body").css({
            overflow: "hidden"
        })
    }), $("#price-layer .close-btn").click(function () {
        $("#price-layer").fadeOut(), $("html,body").css({
            overflow: "auto"
        })
    }), $(".price-btn").click(function () {
        $("#price-layer").fadeIn(), $("html,body").css({
            overflow: "hidden"
        })
    }), $("#code-val").bind("input propertychange", function () {
        /^[a-z1-5]+$/.test($(this).val().trim()) ? 12 === $(this).val().trim().length ? $(".code-btn").attr("disabled", !1).addClass("active") : $(".code-btn").attr("disabled", !0).removeClass("active") : ($(".code-btn").attr("disabled", !0).removeClass("active"), showAlert("您输入的账号不正确！"))
    }), $("html,body").css({
        // overflow: "hidden"
    });
    var f, e = 0,
        p = setInterval(function () {
            ++e <= 99 && ($(".percentage").text(e), $(".loading-progress").css({
                width: e + "%"
            }))
        }, 2);
    ! function d() {
        getGameId(function (t) {
            var e = t.rows;
            if (e.length) {
                var l, s, a = e[0].current_number;
                s = setInterval(function () {
                    getGameDetail(a, function (t) {
                        var e = t.rows;
                        if (e.length) {
                            var a = e[0];
                            if (a.locked) return clearInterval(l), clearInterval(f), $(".timer.lottery_time").html("<p>恭喜最后购买者，本轮！</p><span>你的所有奖励将自动提现至授权\b账号</span>"), $(".winner").find("span.account").text(a.winner), clearInterval(s), $("body").addClass("stop");
                            clearInterval(l);
                            var n = $(".lottery_time"),
                                r = $("header .lottery_time"),
                                o = $(".early-bird"),
                                i = $(".round-title");
                            $(".winner").find("span.account").text(a.winner);
                            var c = +a.total_prize_pool.replace(/(EOS|\s)/g, "");
                            $(".total-usdt").text("= " + (c * localStorage.usdtprice || 0) + " USDT"), $("p.total_prize_pool").text(a.total_prize_pool), $("h2.total_prize_pool").text(c), totalKeys = a.keys, u(+$("#count").val() || 1), l = setInterval(function () {
                                if (i.text(getTranslate("round")(a.number)), a.start_time) isEarly = !1, 1e3 * a.lottery_time < Date.now() ? (d(), n.find("span").text(getTranslate("gameEnd")), n.find("p").text(""), r.text("")) : (n.find("span").text(getTranslate("remainingTime")), n.find("p").text(getBetweenTime(a.lottery_time)), r.text(getBetweenTime(a.lottery_time, !0))), o.css({
                                    display: "none"
                                });
                                else {
                                    isEarly = !0;
                                    var t = a.ico_time + 21600;
                                    1e3 * t < Date.now() ? (n.find("span").text("早鸟轮即将结束"), n.find("p").text(""), r.text(""), o.css({
                                        display: "none"
                                    })) : (n.find("span").text("距早鸟轮结束："), n.find("p").text(getBetweenTime(t)), r.text(getBetweenTime(t, !0)), o.css({
                                        display: "block"
                                    }))
                                }
                            }, 1e3)
                        }
                    })
                }, INTERVAL_TIMER)
            }
        })
    }(), getTeamList(function (t) {
        var n = t.rows,
            r = getTranslate("teamDesc"),
            o = getTranslate("teamPics"),
            i = $(document.createDocumentFragment());
        s.empty();
        var c = getTranslate("jackpot"),
            l = getTranslate("reward");
        ["werewolf", "civilian", "witch", "hunter"].forEach(function (e, t) {
            var a = n.find(function (t) {
                return t.name === e
            });
            i.append($('\n              <div class="team-wrapper' + (0 === t ? " team-wrapper--checked" : "") + "\" data-team='" + e + "'>\n                  <img src=\"./assets/images/" + o(t) + '.png" alt="" class="pic">\n                  <span class="desc">' + r(t) + "</span>\n                  <span>" + c + "\n                    <strong>" + a.pot + "%</strong>\n                  </span>\n                  <span>" + l + "\n                    <strong>" + a.dividend + "%</strong>\n                  </span>\n              </div>"))
        }), s.append(i)
    }), window.abc = 0;
    var a = function () {
        var s = getTranslate("buy"),
            d = getTranslate("draw");
        getTransRecord(function (t) {
            var e = $("#transactionList"),
                a = t.rows,
                l = $(document.createDocumentFragment());
            a.reverse().forEach(function (t) {
                var e = t.amount,
                    a = t.exec_time,
                    n = t.account,
                    r = t.type,
                    o = formatTime(a),
                    i = _slicedToArray(o, 2),
                    c = (i[0], i[1]);
                l.append($('\n            <li class="' + (1 === r ? "buy" : "put") + '-style">\n                  <em>' + n + "</em>\n                  <span>" + (1 === r ? s : d) + "：" + e + "</span>\n                <div>\n                  <span>" + c + "</span>\n                </div>\n              </li>\n            "))
            }), e.empty(), e.append(l), window.abc++, window.abc <= 1 && (clearInterval(p), $(".loading-layer").hide(), $("html,body").css({
                overflow: "auto"
            }))
        })
    };
    f = setInterval(function () {
        a(), getBuyList(function (t) {
            var e = t.rows;
            if (e.length) {
                var a = e[0],
                    n = a.award,
                    r = a.keys,
                    o = a.buyer,
                    i = a.share_award;
                if (o !== localStorage.eos_account) return $(".total-award").text(0), $(".share-award").text(0), $(".total-award--eos").text("0 EOS"), $(".total-award-usdt").text("= 0 USDT"), void $(".owner-keys").text(0);
                ownerKeys = r;
                var c = (n / 1e8).toFixed(8),
                    l = c * localStorage.usdtprice;
                $(".total-award").text(c), $(".share-award").text((i / 1e8).toFixed(8) + " EOS"), $(".total-award--eos").text(c + " EOS"), $(".total-award-usdt").text("= " + l + " USDT"), $(".owner-keys").text(r || 0)
            }
        })
    }, INTERVAL_TIMER), localStorage.eos_account || localStorage.eos_privatekey || fomofomo(), $(".btn-buy").click(function () {
        if (!localStorage.eos_account) return showAlert(getTranslate("pleaseLogin"));
        var t = $(".team-wrapper--checked").data("team"),
            e = $("#count").val();
        if (t && e) {
            if (+e <= 0) return showAlert("宝石数量不能小于 0");
            if (/\./gi.test(e)) return showAlert("数量必须为正整数");
            if (1e4 < +e + ownerKeys && isEarly) return showAlert("早鸟轮额度上限 50.0000 EOS 人");
            if (1e6 < e) return showAlert("单次只能购买不超过100000个");
            $(this).text(getTranslate("purchasing")), buyGem(t, e, function (t) {
                t.broadcast ? showAlert(getTranslate("purchaseSuccess")) : showAlert(getTranslate("purchaseFail"))
            })
        } else showAlert(getTranslate("purchaseEmpty"))
    }), $(".btn-put").on("click", function () {
        if (!localStorage.eos_account) return showAlert(getTranslate("pleaseLogin"));
        getBuyList(function (t) {
            if ((t.rows[0].award / 1e8).toFixed(8) < 10) return showAlert(getTranslate("moreThan10"));
            withDraw()
        })
    }), u(), $(".account_name").text(localStorage.eos_account || getTranslate("auth")), Date.now() > new Date("2018-7-27").valueOf() ? $("#notice").hide() : ($("#closeNotice").on("click", function (t) {
        t.stopPropagation(), $("#notice").hide()
    }), $("#notice").on("click", function () {
        $("#noticeLayer").show()
    }), $("#noticeLayer").on("click", function () {
        $("#noticeLayer").hide()
    }), $("#noticeLayer .layer-content").on("click", function (t) {
        t.stopPropagation()
    }))
});