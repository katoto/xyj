var web3_accountAddr = 0
var web3_gasPrice = 0

var web3_contractNet = null
var global_Second = 30
var xyj = {}

// test
console.log(contractAddr);

if (typeof web3 === "undefined") {
    var isNoMetamask = true
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/WlvljmHqo75RhK1w1QJF"));
    alertify.alert('You are not signed into metamask')
}

// 通过abi 和地址获取已部署的合约对象
contractNet = web3.eth.contract(contractAbi).at(contractAddr)
console.log(contractNet);
console.log('=============');
// activate  一旦部署合约  就停用
// airDropPot_ 空头相关
// airDropTracker_  用于制胜空头
// calcKeysReceived  计算当前的钱能得到多少keys
// getPlayerVaults  通过id 查询数额  winnings  general affiliate
// iWantXKeys  通过keys 计算多少钱

xyj.getAccounts = function (fn) {
    /* 获取当前账号地址 */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    web3.eth.getAccounts(function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res.toString())
            } else {
                fn(err, null)
            }
        } else {
            fn('getAccounts err', null)
        }
    })
}
xyj.getGasPrice = function (fn) {
    /* 获取当前gasPrice */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    web3.eth.getGasPrice(function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res.toNumber(10))
            } else {
                fn(err, null)
            }
        } else {
            fn(new Error('getGasPrice error'), null)
        }
    })
}
/* 获取合约相关数据 */

xyj.getTimeLeft = function (fn) {
    /* 倒计时的时间 */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.getTimeLeft(function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, res.toNumber(10))
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at getTimeLeft', null)
    }
}
xyj.getPlayerInfoByAddress = function (addr, fn) {
    /* 倒计时的时间 */
    if (typeof addr !== "string") {
        return 'need string addr !.'
    }
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.getPlayerInfoByAddress(addr, function (err, res) {
            if (!err) {
                if (res) {
                    // _pID,                               //0
                    //     plyr_[_pID].name,                   //1
                    //     plyrRnds_[_pID][_rID].keys,         //2
                    //     plyr_[_pID].win,                    //3
                    //     (plyr_[_pID].gen).add(calcUnMaskedEarnings(_pID, plyr_[_pID].lrnd)),       //4
                    //     plyr_[_pID].aff,                    //5
                    //     plyrRnds_[_pID][_rID].eth           //6

                    // * @return player ID 0
                    // * @return player name  1
                    // * @return keys owned (current round)  2
                    // * @return winnings vault  3
                    // * @return general vault  4
                    // * @return affiliate vault  5
                    // * @return player round eth  6

                    fn(null, {
                        id: res[0].toString(),
                        inviteName: web3.toUtf8(res[1]),
                        keys: Math.ceil((res[2].toNumber()) / (10 ** 18)),
                        // earn: (res[4].toNumber()) / (10 ** 18),
                        earn: web3.fromWei(res[4].toNumber()),
                        totalEarn: web3.fromWei(res[5].toNumber() + res[4].toNumber()),
                        shareEarn: web3.fromWei(res[5].toNumber()),
                        payMoney: web3.fromWei(res[6].toNumber()),
                        winningValue:web3.fromWei(res[3].toNumber())
                    })
                }
            } else {
                fn('getPlayerInfoByAddress error', null)
            }
        })
    } else {
        fn('contractNet error at getPlayerInfoByAddress', null)
    }
}
xyj.getCurrentRoundInfo = function (fn) {
    /* 当前信息 */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    // * @return eth invested during ICO phase 0
    // * @return round id 1
    // * @return total keys for round2
    // * @return time round ends 3
    // * @return time round started4
    // * @return current pot  5

    // * @return current team ID & player ID in lead 7
    // * @return current player in leads address8
    // * @return current player in leads name9

    // * @return whales eth in for round10
    // * @return bears eth in for round 11
    // * @return sneks eth in for round  12
    // * @return bulls eth in for round 13

    // * @return airdrop tracker # & airdrop pot
    if (contractNet) {
        contractNet.getCurrentRoundInfo(function (err, res) {
            // 0 = whales
            // 1 = bears
            // 2 = sneks
            // 3 = bulls
            if (!err) {
                if (res) {
                    fn(null, {
                        roundNum: res[1].toNumber(),
                        totalKey: Math.ceil((res[2].toNumber()) / (10 ** 18)),
                        currPot: web3.fromWei(res[5].toNumber()),
                        startedTime: res[4].toNumber(),
                        endedTime: res[3].toNumber(),

                        whales_0: web3.fromWei(res[9].toNumber()),
                        bears_1: web3.fromWei(res[10].toNumber()),
                        sneks_2: web3.fromWei(res[11].toNumber()),
                        bulls_3: web3.fromWei(res[12].toNumber()),

                        purchasedSeconds: (Math.ceil((res[2].toNumber()) / (10 ** 18)) * global_Second),
                        purchasedTime: (Math.ceil((res[2].toNumber()) / (10 ** 18)) * global_Second) / (3600 * 24 * 365),

                        lastBuyAddr: res[7].toString(),
                        lastBuyName: web3.toUtf8(res[8])
                    })
                }
            } else {
                fn('getCurrentRoundInfo error', null)
            }
        })
    } else {
        fn('contractNet error at getCurrentRoundInfo', null)
    }
}
xyj.getBuyPrice = function (fn) {
    /* key 的value */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    contractNet.getBuyPrice(function (err, res) {
        if (!err) {
            if (res) {
                var web3_getBuyPrice = res.toNumber(10)
                fn(null, web3_getBuyPrice / (10 ** 18))
            }
        } else {
            fn('getBuyPrice error', null)
        }
    })
}
xyj.iWantXKeys = function (keyNum, fn) {
    if (typeof keyNum !== 'number') {
        return 'keyNum need number'
    }
    if (contractNet) {
        contractNet.iWantXKeys(parseFloat(keyNum), function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXaddr', null)
    }
}

xyj.withdraw = function (fn) {
    /* key 的value */
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    contractNet.withdraw(function (err, res) {
        if (!err) {
            if (res) {
                fn(null, true)
            }
        } else {
            fn('withdraw error', null)
        }
    })
}

xyj.registerNameXname = function (regName, _affCode, fn) {
    // * @param _nameString players desired name
    // * @param _affCode affiliate ID, address, or name of who referred you
    // * @param _all set to true if you want this to push your info to all games
    if (typeof regName !== "string") {
        return 'need string regName !.'
    }
    if (typeof _affCode !== "string") {
        return 'need string _affCode name !.'
    }
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.registerNameXname(regName.toString(), _affCode, true, {value: web3.toWei('0.01', "ether")}, function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXname', null)
    }
}
xyj.registerNameXaddr = function (regName, _affCode, fn) {
    // * @param _nameString players desired name
    // * @param _affCode affiliate ID, address, or name of who referred you
    // * @param _all set to true if you want this to push your info to all games
    if (typeof regName !== "string") {
        return 'need string regName !.'
    }
    if (typeof _affCode !== "string") {
        return 'need string _affCode addr !.'
    }
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.registerNameXaddr(regName.toString(), _affCode, true, {value: web3.toWei('0.01', "ether")}, function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXaddr', null)
    }
}
xyj.registerNameXID = function (regName, _affCode, fn) {
    // * @param _nameString players desired name
    // * @param _affCode affiliate ID, address, or name of who referred you
    // * @param _all set to true if you want this to push your info to all games
    if (typeof regName !== "string") {
        return 'need string regName !.'
    }
    if (typeof _affCode !== "number") {
        return 'need number _affCode id !.'
    }
    if (typeof fn !== "function") {
        return 'need async function !.'
    }
    if (contractNet) {
        contractNet.registerNameXID(regName.toString(), _affCode, true, {value: web3.toWei('0.01', "ether")}, function (err, res) {
            if (!err) {
                if (res) {
                    fn(null, true)
                }
            } else {
                fn(err, null)
            }
        })
    } else {
        fn('contractNet error at registerNameXname', null)
    }
}

xyj.getRound = function (fn) {
    if (contractNet) {
        this.getCurrentRoundInfo(function (error, result) {
            if (result) {
                contractNet.round_(parseFloat(result.roundNum), function (err, res) {
                    if (!err) {
                        if (res) {
                            var roundObj = null
                            if (res[6].toNumber() - res[7].toNumber() < 0) {
                                roundObj = {
                                    totalEth: web3.fromWei(res[6].toNumber()),
                                    distributionEth: 0,
                                    roundPot: web3.fromWei(res[7].toNumber())
                                }
                            } else {
                                roundObj = {
                                    totalEth: web3.fromWei(res[6].toNumber()),
                                    distributionEth: web3.fromWei(res[6].toNumber() - res[7].toNumber()),
                                    roundPot: web3.fromWei(res[7].toNumber())
                                }
                            }

                            fn(null, roundObj)
                        }
                    } else {
                        fn(err, null)
                    }
                })
            }
        })
    } else {
        fn('contractNet error at getRound', null)
    }
}

// round_
/* 实时播报 */
contractNet.allEvents(function (err, res) {
    // 4种事件类型
    /**
     * @dev prepares compression data and fires event for buy or reload tx's  onEndTx
     */
    //  onAffiliatePayout
    // (fomo3d long only) fired whenever a player tries a buy after round timer  onBuyAndDistribute
    // fired whenever a player registers a name   onNewName
    // received pot swap deposit  // onPotSwapDeposit
    // received pot swap deposit  // onPotSwapDeposit
    // fire buy and distribute event    onReLoadAndDistribute
    // fired whenever theres a withdraw   onWithdraw
    // fired whenever a withdraw forces end round to be ran  onWithdrawAndDistribute

    // "onWithdraw"  // "onNewName"  // "onAffiliatePayout"  // "onEndTx"
    // NewName 弹窗 A new member has been added to our Advisory Board. Please welcome jumpson2

    if (!err) {
        if (res) {
            window.refreshTime();
            if (res.event === 'onEndTx') {
                if (xyj._account === res.args.playerAddress) {
                    alertify.success('您已成功购买' + (res.args.keysBought / (10 ** 18)).toFixed(0) + '个金钻');
                } else if (web3.toUtf8(res.args.playerName) !== '') {
                    alertify.success(web3.toUtf8(res.args.playerName) + '已成功购买' + (res.args.keysBought / (10 ** 18)).toFixed(0) + '个金钻');
                }
                xyj._account && window.refreshPersonInfo();
                window.refreshInfo();
            } else if (res.event === 'onNewName') {
                // alertify.success('A new member has been added to our Advisory Board. Please welcome ' + web3.toUtf8(res.args.playerName));
                alertify.success('全体起立，热烈欢迎' + web3.toUtf8(res.args.playerName) + '加入到我们推荐大队!');
            } else if (res.event === 'onWithdraw') {
                xyj._account && window.refreshPersonInfo();
            }
        }
    } else {
        console.error('allEvents' + error);
    }
    console.log('== 用于 实时播报 ====');
})

xyj.buyXaddr = function (_affCode, _team, totalVal, fn) {
    /*
    *
        @param _affCode   the ID/address/name of the player who gets the affiliate fee
        @param _team what team is the player playing for?
    *
    * */
    if (typeof _affCode !== 'string') {
        fn('_affCode param 1 need Sting ( addr )', null)
        return '_affCode param 1 need Sting ( addr )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXaddr(_affCode, parseInt(_team), {value: web3.toWei(totalVal, "ether")}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXaddr error', null)
            }
        } else {
            fn(err, null)
        }
    })
}
xyj.buyXname = function (_affCode, _team, totalVal, fn) {
    /*
    *
        @param _affCode   the ID/address/name of the player who gets the affiliate fee
        @param _team what team is the player playing for?
    *
    * */
    if (typeof _affCode !== 'string') {
        fn('_affCode param 1 need Sting ( addr )', null)
        return '_affCode param 1 need Sting ( addr )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXname(_affCode, parseInt(_team), {value: web3.toWei(totalVal, "ether")}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXname error', null)
            }
        } else {
            fn(err, null)
        }
    })
}
xyj.buyXid = function (_affCode, _team, totalVal, fn) {
    /*
    *
        @param _affCode   the ID/address/name of the player who gets the affiliate fee
        @param _team what team is the player playing for?
    *
    * */
    if (typeof _affCode !== 'number') {
        fn('_affCode param 1 need number ( id )', null)
        return '_affCode param 1 need number ( id )'
    }
    if (typeof _team !== 'number') {
        fn('_team param 2 need number (0,1,2,3)', null)
        return '_team param 2 need number (0,1,2,3)'
    }
    if (typeof totalVal === 'string') {
        totalVal = parseFloat(totalVal)
    }
    if (!totalVal) {
        fn('totalVal param 3 error', null)
        return 'totalVal param 3 error'
    }
    contractNet.buyXid(_affCode, parseInt(_team), {value: web3.toWei(totalVal, "ether")}, function (err, res) {
        if (!err) {
            if (res) {
                fn(null, res)
            } else {
                fn('buyXid error', null)
            }
        } else {
            fn(err, null)
        }
    })
}