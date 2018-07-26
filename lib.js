"use strict";

function eosConfig(e) {
    eos = Eos({
        httpEndpoint: network.protocol + "://" + network.host,
        chainId: network.chainId,
        keyProvider: e
    })
}

function fomoScatter() {
    scatter.getIdentity(requiredFields).then(function (e) {
        if (localStorage.eos_account = e.accounts[0].name, "owner" == e.accounts[0].authority) return showAlert("请使用 active 权限");
        eos.getAccount(localStorage.eos_account).then(function (e) {
            $(".account_name").text(e.account_name);
            var t = e.permissions[0].required_auth.keys[0].key,
                o = e.permissions[0].required_auth.accounts;
            if (o.length) {
                var n = !1;
                if (o.forEach(function (e) {
                        n || e.permission.actor !== codeScope || (n = !0)
                    }), n) showAlert("授权成功！"), getBuyList(function (e) {
                    localStorage.eos_account != e.rows[0].buyer ? $("#code-layer").show() : e.rows[0].keys || e.rows[0].sharer || $("#code-layer").show()
                });
                else if (window.confirm(getTranslate("confirmUpdateAuth"))) {
                    var c = {
                        threshold: 1,
                        keys: [{
                            key: t,
                            weight: 1
                        }],
                        accounts: [{
                            permission: {
                                actor: codeScope,
                                permission: "eosio.code"
                            },
                            weight: 1
                        }]
                    };
                    updateAuth(localStorage.eos_account, c)
                }
            } else {
                if (window.confirm(getTranslate("confirmUpdateAuth"))) {
                    c = {
                        threshold: 1,
                        keys: [{
                            key: t,
                            weight: 1
                        }],
                        accounts: [{
                            permission: {
                                actor: codeScope,
                                permission: "eosio.code"
                            },
                            weight: 1
                        }]
                    };
                    updateAuth(localStorage.eos_account, c)
                }
            }
        })
    }).catch(function (e) {})
}

function updateAuth(e, t, o) {
    var n = {
        account: e,
        permission: "active",
        parent: "owner",
        auth: t
    };
    eos.updateauth(n).then(function (e) {
        o && o(e), getBuyList(function (e) {
            localStorage.eos_account != e.rows[0].buyer ? $("#code-layer").show() : e.rows[0].keys || e.rows[0].sharer || $("#code-layer").show()
        }), $(".account_name").text(e.account_name)
    }).catch(function (e) {})
}

function fomofomo() {
    try {
        ios ? window.webkit.messageHandlers.getProviderKey.postMessage("") : android && androidJs.fomofomo()
    } catch (e) {}
}

function fomosend(e, t) {
    localStorage.eos_account = e, eosConfig(localStorage.eos_privatekey = t), $("#share-layer .code-val").text(e)
}

function getEosData(e, t) {
    eos.getTableRows(e).then(function (e) {
        t && t(e)
    }).catch(function (e) {})
}

function getBuyList(t) {
    if (localStorage.eos_account) {
        var e = {
            json: !0,
            code: codeScope,
            scope: codeScope,
            table: "purchases",
            limit: 1,
            lower_bound: localStorage.eos_account
        };
        eos.getTableRows(e).then(function (e) {
            t && t(e)
        }).catch(function (e) {})
    }
}

function getGameId(t) {
    var e = {
        json: !0,
        code: codeScope,
        scope: codeScope,
        table: "global",
        limit: 1
    };
    eos.getTableRows(e).then(function (e) {
        t && t(e)
    }).catch(function (e) {})
}

function getGameDetail(e, o) {
    var t = {
        json: !0,
        code: codeScope,
        scope: codeScope,
        table: "games",
        lower_bound: e,
        limit: 1
    };
    eos.getTableRows(t).then(function (e) {
        var t = e.rows;
        t.length && t[0].sharer && $("#code-layer").hide(), o(e)
    }).catch(function (e) {})
}

function getTeamList(t) {
    var e = {
        json: !0,
        code: codeScope,
        scope: codeScope,
        table: "teams"
    };
    eos.getTableRows(e).then(function (e) {
        t && t(e)
    }).catch(function (e) {})
}

function buyGem(t, o, n) {
    if (localStorage.eos_account) {
        var c = localStorage.eos_account;
        eos.contract(codeScope).then(function (e) {
            e.buykey({
                buyer: c,
                team: t,
                keys: o
            }, {
                authorization: [c + "@active"]
            }).then(function (e) {
                $(".btn-buy").text(getTranslate("buyBtn")), n && n(e)
            }).catch(function (e) {
                var t = JSON.parse(e);
                showAlert(t.error.details[0].message), $(".btn-buy").text(getTranslate("buyBtn"))
            })
        })
    }
}

function withDraw(t) {
    if (localStorage.eos_account) {
        $(".btn-put").text(getTranslate("withdrawal"));
        var o = localStorage.eos_account;
        eos.contract(codeScope).then(function (e) {
            $(".btn-put").text(getTranslate("withdraw")), e.withdraw(o, {
                authorization: [o + "@active"]
            }).then(function (e) {
                t && t(e)
            })
        }).catch(function (e) {
            showAlert("提现失败"), $(".btn-put").text(getTranslate("withdraw"))
        })
    }
}

function regsharer(t, o) {
    var n = localStorage.eos_account;
    eos.contract(codeScope).then(function (e) {
        e.regsharer(n, t, {
            authorization: [n + "@active"]
        }).then(function (e) {
            showAlert(getTranslate("submitSuccess")), o && o(e)
        }).catch(function () {
            showAlert(getTranslate("submitFail"))
        })
    })
}

function getTransRecord(t) {
    var e = {
        json: !0,
        code: codeScope,
        scope: codeScope,
        table: "records"
    };
    eos.getTableRows(e).then(function (e) {
        t && t(e)
    }).catch(function (e) {})
}

function logout() {
    $(".account_name").text(getTranslate("exiting")), eos.getAccount(localStorage.eos_account).then(function (e) {
        var t = e.permissions[0].required_auth.accounts,
            o = t.findIndex(function (e) {
                return e.permission.actor === codeScope
            });
        t.splice(o, 1);
        var n = {
            threshold: 1,
            keys: [{
                key: e.permissions[0].required_auth.keys[0].key,
                weight: 1
            }],
            accounts: t
        };
        updateAuth(localStorage.eos_account, n, function () {
            localStorage.clear(), $(".account_name").text(getTranslate("auth")), showAlert(getTranslate("exitSuccess")), scatter.forgetIdentity()
        })
    }).catch(function (e) {
        $(".account_name").text(localStorage.eos_account), showAlert(getTranslate("exitFail"))
    })
}

function getUSDT() {
    $.ajax({
        type: "GET",
        url: "https://api.coinmarketcap.com/v2/ticker/1765/?convert=USDT",
        dataType: "json",
        success: function (e) {
            localStorage.usdtprice = e.data.quotes.USDT.price
        }
    })
}
var eos, _slicedToArray = function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return function (e, t) {
            var o = [],
                n = !0,
                c = !1,
                a = void 0;
            try {
                for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done) && (o.push(r.value), !t || o.length !== t); n = !0);
            } catch (e) {
                c = !0, a = e
            } finally {
                try {
                    !n && s.return && s.return()
                } finally {
                    if (c) throw a
                }
            }
            return o
        }(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    },
    bpArrHost = ["https://mainnet.eoscannada.com", "https://api.cypherglass.com", "https://api1.eosasia.one", "https://api.eosnewyork.io", "https://nodes.eos42.io", "https://api.eoslaomao.com", "https://eu.eosdac.io", "https://api.eosrio.io", "https://nodes.get-scatter.com"],
    index = Math.floor(Math.random() * Math.floor(bpArrHost.length)),
    _bpArrHost$index$spli = bpArrHost[index].split("://"),
    _bpArrHost$index$spli2 = _slicedToArray(_bpArrHost$index$spli, 2),
    protocol = _bpArrHost$index$spli2[0],
    host = _bpArrHost$index$spli2[1],
    codeScope = "eosfoiowolfs";
window.scatter = null;
var network = {
        blockchain: "eos",
        host: host,
        port: 443,
        protocol: protocol,
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    },
    requiredFields = {
        accounts: [network]
    };
eosConfig(), document.addEventListener("scatterLoaded", function (e) {
    var t = window.scatter;
    t.requireVersion(6.1), eos = t.eos(network, Eos, {
        chainId: network.chainId
    })
});
var UA = window.navigator.userAgent,
    ios = /iPhone|iPod/gi.test(UA),
    android = /Android/gi.test(UA);
getUSDT(), setInterval(function () {
    getUSDT()
}, 3e6);