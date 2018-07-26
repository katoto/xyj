var web3_accountAddr = 0
var web3_gasPrice = 0

if (typeof web3 !== "undefined") {
    console.log(web3)
    console.log(web3.version)
    web3.eth.getBlock(48, function (error, result) {
        if (!error) {
            console.log((result));
        } else {
            console.error(error);
        }
    })
    /* 获取当前账号地址 */
    web3.eth.getAccounts(function (err, res) {
        if (!err) {
            console.log(res.toString());  // []
            if (res.length > 0) {
                web3_accountAddr = res.toString()
                console.log(web3_accountAddr);
                console.log('===当前地址======');
            }
        } else {
            console.error('getAccount' + error);
        }
    })
    /* 获取当前gasPrice */
    web3.eth.getGasPrice(function (err, res) {
        if (!err) {
            if (res) {
                web3_gasPrice = res.toNumber(10)
                console.log(web3_gasPrice);
                console.log('===当前gas======');
            }
        } else {
            console.error('getAccount' + error);
        }
    })
    /* 获取合约相关数据 */


} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/*
*   transfer methods
*
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

$('#js_tranMask').on('click',)