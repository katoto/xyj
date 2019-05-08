
var addressHex = "%1$s";
var rpcURL = "%2$s";
var chainID = "%3$s";
function executeCallback (id, error, value) {
  Trust.executeCallback(id, error, value);
}function onSignSuccessful(id, value) {
  Trust.executeCallback(id, null, value);
}function onSignError(id, error) {
  Trust.executeCallback(id, error, null);
}window.Trust.init(rpcURL, {
  getAccounts: function (cb) { cb(null, [addressHex]) },
  processTransaction: function (tx, cb){
    console.log('signing a transaction', tx);
    var id = 8888;
    if(tx && tx.id){
        id = tx.id;
    }Trust.addCallback(id, cb);
    var gasLimit = tx.gasLimit || tx.gas || null;
    var gasPrice = tx.gasPrice || null;
    var data = tx.data || null;
    var nonce = tx.nonce || -1;
    coinsprize.signTransaction(id, tx.to || null, tx.value, nonce, gasLimit, gasPrice, data);
  },
  signMessage: function (msgParams, cb) {
    var data = null; 
    var id = 8888; 
    if(msgParams && msgParams.id){
        id = msgParams.id;
    }
    if(msgParams && msgParams.data){
        data = msgParams.data;
    }
    console.log("signing a message", msgParams);
    Trust.addCallback(id, cb);
    coinsprize.signMessage(id, data);
  },
  signPersonalMessage: function (msgParams, cb) {
    var data = null; 
    var id = 8888; 
    if(msgParams && msgParams.id){
        id = msgParams.id;
    }
    if(msgParams && msgParams.data){
        data = msgParams.data;
    }
    console.log("signing a personal message", msgParams);
    Trust.addCallback(id, cb);
    coinsprize.signPersonalMessage(id, data);
  },
  signTypedMessage: function (msgParams, cb) {
    var data = null; 
    var id = 8888; 
    if(msgParams && msgParams.id){
        id = msgParams.id;
    }
    if(msgParams && msgParams.data){
        data = msgParams.data;
    }
    Trust.addCallback(id, cb);
    coinsprize.signTypedMessage(id, JSON.stringify(data));
  }
}, {
    address: addressHex,
    networkVersion: chainID
});window.web3.setProvider = function () {
  console.debug('Trust Wallet - overrode web3.setProvider')
};window.web3.eth.defaultAccount = addressHex;
window.web3.version.getNetwork = function(cb) {
    cb(null, chainID);
};window.web3.eth.getCoinbase = function(cb) {
    return cb(null, addressHex);
};