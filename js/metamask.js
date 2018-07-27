var web3_accountAddr = 0
var web3_gasPrice = 0

var web3_contractNet = null
var xyj = {}

if (typeof web3 !== "undefined") {
    console.log(web3)
    console.log(web3.version)

    xyj.getBlock = function (fn) {
        /* 获取当前区块 */
        if (typeof fn !== "function") {
            return 'need async function !.'
        }
        web3.eth.getBlock(48, function (error, result) {
            if (!error) {
                console.log((result));
            } else {
                console.error(error);
            }
        })
    }
    xyj.getAccounts = function (fn) {
        /* 获取当前账号地址 */
        if (typeof fn !== "function") {
            return 'need async function !.'
        }
        web3.eth.getAccounts(function (err, res) {
            if (!err) {
                if (res) {
                    web3_accountAddr = res.toString()
                    fn(null, web3_accountAddr)
                    console.log(web3_accountAddr);
                    console.log('===当前地址======');
                } else {
                    fn(new Error('getAccounts error'), null)
                }
            } else {
                fn(err, null)
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
                    web3_gasPrice = res.toNumber(10)
                    fn(null, web3_gasPrice)
                    console.log(web3_gasPrice);
                    console.log('===当前gas======');
                } else {
                    fn(new Error('getGasPrice error'), null)
                }
            } else {
                fn(err, null)
            }
        })
    }

    /* 获取合约相关数据 */
    // 3d 合约地址
    var contractAddr = '0x5f60d2d3d5b76bf50747ed9729cb8193b39ed917'
    //  合约abi
    var contractAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "roundID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amountAddedToPot",
                    "type": "uint256"
                }
            ],
            "name": "onPotSwapDeposit",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "activate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "address"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                }
            ],
            "name": "buyXaddr",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "uint256"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                }
            ],
            "name": "buyXid",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "bytes32"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                }
            ],
            "name": "buyXname",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_pID",
                    "type": "uint256"
                },
                {
                    "name": "_addr",
                    "type": "address"
                },
                {
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "name": "_laff",
                    "type": "uint256"
                }
            ],
            "name": "receivePlayerInfo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_pID",
                    "type": "uint256"
                },
                {
                    "name": "_name",
                    "type": "bytes32"
                }
            ],
            "name": "receivePlayerNameList",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_nameString",
                    "type": "string"
                },
                {
                    "name": "_affCode",
                    "type": "address"
                },
                {
                    "name": "_all",
                    "type": "bool"
                }
            ],
            "name": "registerNameXaddr",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "compressedData",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedIDs",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "ethIn",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "keysBought",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "winnerAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "winnerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "amountWon",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "newPot",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "P3DAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "genAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "potAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "airDropPot",
                    "type": "uint256"
                }
            ],
            "name": "onEndTx",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "playerID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "isNewPlayer",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "name": "affiliateID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "affiliateAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "affiliateName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "amountPaid",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "timeStamp",
                    "type": "uint256"
                }
            ],
            "name": "onNewName",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "affiliateID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "affiliateAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "affiliateName",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "roundID",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "buyerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "timeStamp",
                    "type": "uint256"
                }
            ],
            "name": "onAffiliatePayout",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_nameString",
                    "type": "string"
                },
                {
                    "name": "_affCode",
                    "type": "uint256"
                },
                {
                    "name": "_all",
                    "type": "bool"
                }
            ],
            "name": "registerNameXID",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "compressedData",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedIDs",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "winnerAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "winnerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "amountWon",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "newPot",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "P3DAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "genAmount",
                    "type": "uint256"
                }
            ],
            "name": "onReLoadAndDistribute",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "ethIn",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedData",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedIDs",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "winnerAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "winnerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "amountWon",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "newPot",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "P3DAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "genAmount",
                    "type": "uint256"
                }
            ],
            "name": "onBuyAndDistribute",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "ethOut",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedData",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "compressedIDs",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "winnerAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "winnerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "amountWon",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "newPot",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "P3DAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "genAmount",
                    "type": "uint256"
                }
            ],
            "name": "onWithdrawAndDistribute",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "playerID",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "playerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "playerName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "ethOut",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "timeStamp",
                    "type": "uint256"
                }
            ],
            "name": "onWithdraw",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_nameString",
                    "type": "string"
                },
                {
                    "name": "_affCode",
                    "type": "bytes32"
                },
                {
                    "name": "_all",
                    "type": "bool"
                }
            ],
            "name": "registerNameXname",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "address"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                },
                {
                    "name": "_eth",
                    "type": "uint256"
                }
            ],
            "name": "reLoadXaddr",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "uint256"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                },
                {
                    "name": "_eth",
                    "type": "uint256"
                }
            ],
            "name": "reLoadXid",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_affCode",
                    "type": "bytes32"
                },
                {
                    "name": "_team",
                    "type": "uint256"
                },
                {
                    "name": "_eth",
                    "type": "uint256"
                }
            ],
            "name": "reLoadXname",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "activated_",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "airDropPot_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "airDropTracker_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_rID",
                    "type": "uint256"
                },
                {
                    "name": "_eth",
                    "type": "uint256"
                }
            ],
            "name": "calcKeysReceived",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "fees_",
            "outputs": [
                {
                    "name": "gen",
                    "type": "uint256"
                },
                {
                    "name": "p3d",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBuyPrice",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCurrentRoundInfo",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "getPlayerInfoByAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_pID",
                    "type": "uint256"
                }
            ],
            "name": "getPlayerVaults",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getTimeLeft",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_keys",
                    "type": "uint256"
                }
            ],
            "name": "iWantXKeys",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "pIDxAddr_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "pIDxName_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "plyr_",
            "outputs": [
                {
                    "name": "addr",
                    "type": "address"
                },
                {
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "name": "win",
                    "type": "uint256"
                },
                {
                    "name": "gen",
                    "type": "uint256"
                },
                {
                    "name": "aff",
                    "type": "uint256"
                },
                {
                    "name": "lrnd",
                    "type": "uint256"
                },
                {
                    "name": "laff",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "plyrNames_",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "plyrRnds_",
            "outputs": [
                {
                    "name": "eth",
                    "type": "uint256"
                },
                {
                    "name": "keys",
                    "type": "uint256"
                },
                {
                    "name": "mask",
                    "type": "uint256"
                },
                {
                    "name": "ico",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "potSplit_",
            "outputs": [
                {
                    "name": "gen",
                    "type": "uint256"
                },
                {
                    "name": "p3d",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "rID_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "rndTmEth_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "round_",
            "outputs": [
                {
                    "name": "plyr",
                    "type": "uint256"
                },
                {
                    "name": "team",
                    "type": "uint256"
                },
                {
                    "name": "end",
                    "type": "uint256"
                },
                {
                    "name": "ended",
                    "type": "bool"
                },
                {
                    "name": "strt",
                    "type": "uint256"
                },
                {
                    "name": "keys",
                    "type": "uint256"
                },
                {
                    "name": "eth",
                    "type": "uint256"
                },
                {
                    "name": "pot",
                    "type": "uint256"
                },
                {
                    "name": "mask",
                    "type": "uint256"
                },
                {
                    "name": "ico",
                    "type": "uint256"
                },
                {
                    "name": "icoGen",
                    "type": "uint256"
                },
                {
                    "name": "icoAvg",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    //  online
    // var contractAddr = '0xA62142888ABa8370742bE823c1782D17A0389Da1'

    // 通过abi 和地址获取已部署的合约对象
    contractNet = web3.eth.contract(contractAbi).at(contractAddr)
    console.log(contractNet);
    // activate  一旦部署合约  就停用
    // airDropPot_ 空头相关
    // airDropTracker_  用于制胜空头

    xyj.getTimeLeft = function (fn) {
        /* 倒计时的时间 */
        if (typeof fn !== "function") {
            return 'need async function !.'
        }
        if (contractNet) {
            contractNet.getTimeLeft(function (err, res) {
                if (!err) {
                    if (res) {
                        var web3_getTimeLeft = res.toNumber(10)
                        fn(null, web3_getTimeLeft)
                        console.log(web3_getTimeLeft);
                        console.log('===当前合约time======');
                    }
                } else {
                    fn('getTimeLeft error', null)
                    console.error('getTimeLeft' + error);
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
                        // * @return player ID
                        // * @return player name
                        // * @return keys owned (current round)
                        // * @return winnings vault
                        // * @return general vault
                        // * @return affiliate vault
                        // * @return player round eth
                        fn(null, {
                            id: res[0].toString(),
                            inviteName: web3.toAscii(res[1]),
                            keys: Math.ceil((res[2].toNumber()) / (10 ** 18)),
                            earn: (res[4].toNumber()) / (10 ** 18),
                            shareEarn: (res[5].toNumber()) / (10 ** 18),
                        })
                        console.log({
                            id: res[0].toString(),
                            inviteName: web3.toAscii(res[1]),
                            keys: Math.ceil((res[2].toNumber()) / (10 ** 18)),
                            earn: (res[4].toNumber()) / (10 ** 18),
                            shareEarn: (res[5].toNumber()) / (10 ** 18),
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
        // * @return eth invested during ICO phase 1
        // * @return round id2
        // * @return total keys for round3
        // * @return time round ends4
        // * @return time round started5
        // * @return current pot6

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
                if (!err) {
                    if (res) {
                        fn(null, {
                            totalKey: Math.ceil((res[2].toNumber()) / (10 ** 18)),
                            currPot: res[6].toString(),
                            endsTime: res[4].toNumber(),
                            started:res[5],  // todo
                            whales: Math.ceil((res[10].toNumber()) / (10 ** 18)),
                            bears: Math.ceil((res[11].toNumber()) / (10 ** 18)),
                            sneks: Math.ceil((res[12].toNumber()) / (10 ** 18)),
                            bulls: Math.ceil((res[13].toNumber()) / (10 ** 18)),
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

    // contractNet.getCurrentRoundInfo(function (err, res) {
    //     if (!err) {
    //         if (res) {
    //             console.log(res);
    //             console.log('=========');
    //             console.log({
    //                 totalKey: Math.ceil((res[2].toNumber()) / (10 ** 18)),
    //                 currPot: res[6].toString(),
    //                 currPot1: res[4].toString(),
    //                 currPot2: res[5].toNumber(),
    //                 whales: Math.ceil((res[10].toNumber()) / (10 ** 18)),
    //                 bears: Math.ceil((res[11].toNumber()) / (10 ** 18)),
    //                 sneks: Math.ceil((res[12].toNumber()) / (10 ** 18)),
    //                 bulls: Math.ceil((res[13].toNumber()) / (10 ** 18)),
    //             })
    //         }
    //     } else {
    //         fn('getCurrentRoundInfo error', null)
    //     }
    // })

    xyj.registerNameXname = function (regName, _affCode, fn) {
        // * @param _nameString players desired name
        // * @param _affCode affiliate ID, address, or name of who referred you
        // * @param _all set to true if you want this to push your info to all games
        if (typeof regName !== "string") {
            return 'need string regName !.'
        }
        if (typeof fn !== "function") {
            return 'need async function !.'
        }
        if (contractNet) {
            contractNet.registerNameXname(regName, _affCode, function (err, res) {
                if (!err) {
                    if (res) {
                        fn(null, true)
                    }
                } else {
                    fn('registerNameXname error', null)
                }
            })
        } else {
            fn('contractNet error at registerNameXname', null)
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
                    if (web3_getBuyPrice) {
                        fn(null, web3_getBuyPrice / (10 ** 18))
                    }
                }
            } else {
                fn('getBuyPrice error', null)
            }
        })
    }


    /* 实时播报 */
    contractNet.allEvents(function (err, res) {
        // 4种事件类型
        // "onWithdraw"  // "onNewName"  // "onAffiliatePayout"  // "onEndTx"
        if (!err) {
            if (res) {
                // console.log(res);
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
            return '_affCode param 1 need Sting ( addr )'
        }
        if (typeof _team !== 'number') {
            return '_team param 2 need number (0,1,2,3)'
        }
        if (typeof totalVal === 'string') {
            totalVal = parseFloat(totalVal)
        }
        if (!totalVal) {
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
            return '_affCode param 1 need Sting ( addr )'
        }
        if (typeof _team !== 'number') {
            return '_team param 2 need number (0,1,2,3)'
        }
        if (typeof totalVal === 'string') {
            totalVal = parseFloat(totalVal)
        }
        if (!totalVal) {
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
            return '_affCode param 1 need number ( id )'
        }
        if (typeof _team !== 'number') {
            return '_team param 2 need number (0,1,2,3)'
        }
        if (typeof totalVal === 'string') {
            totalVal = parseFloat(totalVal)
        }
        if (!totalVal) {
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

} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.log(xyj);
console.log('====xyj=======');

/*
*   transfer methods
* */
function transKey(fromAddr, toAddr, keyVal, gas, sendData) {
    fromAddr = fromAddr || '0x81Fa761dB3bFA16aE9Bb7c41ec7993def65cf386';
    toAddr = toAddr || '0x2b5006d3dce09dafec33bfd08ebec9327f1612d8';
    keyVal = keyVal || '1';
    gas = gas || '31000';
    sendData = sendData || '123';
    if (typeof web3 !== 'undefined') {
        web3.eth.sendTransaction({
            from: fromAddr,
            to: Msg.withdraw_addr,
            value: web3.toWei(Number(Msg.amount), 'ether'),   // The value transferred for the transaction in wei
            gas: parseFloat(gas),
            data: sendData
        }, function (err, res) {
            console.log(res);
        })
    } else {
        this.$message({
            message: '请手动调起metamask插件',
            type: 'error',
            duration: 1200
        })
    }
}

$('#js_tranMask').on('click', transKey)