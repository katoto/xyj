if (typeof web3 !== "undefined") {
    console.log(web3)
    console.log(web3.version)
    web3.eth.getBlock(48, function (error, result) {
        if (!error){
            console.log(JSON.stringify(result));
            console.log((result));
        } else {
            console.error(error);
        }
    })
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

$('#js_tranMask').on('click',function () {
    if (typeof web3 !== 'undefined') {
        web3.eth.sendTransaction({
            from: '0x81Fa761dB3bFA16aE9Bb7c41ec7993def65cf386',
            to: Msg.withdraw_addr,
            value: web3.toWei(Number(Msg.amount), 'ether'),   // The value transferred for the transaction in wei
            gas: 31000,
            data: web3.toHex(Msg.uid + '$' + Msg.oid)
        }, function (err, hash) {
            console.log(hash);
        })
    } else {
        this.$message({
            message: '请手动调起metamask插件',
            type: 'error',
            duration: 1200
        })
    }
})