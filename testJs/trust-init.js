
// const addressHex = "%1$s";
const addressHex = "0x2b5006d3dce09dafec33bfd08ebec9327f1612d8";
const rpcURL = "https://mainnet.infura.io/v3/c7548925bf5f4ee2a57709579450e1a1";
const chainID = "3";

function executeCallback (id, error, value) {
    console.log(111)
  Trust.executeCallback(id, error, value)
}
function onSignSuccessful(id, value) {
  Trust.executeCallback(id, null, value)
}
function onSignError(id, error) {
  Trust.executeCallback(id, error, null)
}
window.Trust.init(rpcURL, {
  getAccounts: function (cb) { cb(null, [addressHex]) },
  processTransaction: function (tx, cb){

    console.log('signing a transaction', tx)
    console.log(11111111111111)
    console.log(tx)
    const { id = 8888 } = tx
    console.log( Trust )
    Trust.addCallback(id, cb)
    var gasLimit = tx.gasLimit || tx.gas || null;
    var gasPrice = tx.gasPrice || null;
    var data = tx.data || null;
    var nonce = tx.nonce || -1;
    
    trust.signTransaction(id, tx.to || null, tx.value, nonce, gasLimit, gasPrice, data);
  },
  signMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    console.log("signing a message", msgParams)
    Trust.addCallback(id, cb)
    trust.signMessage(id, data);
  },
  signPersonalMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    console.log("signing a personal message", msgParams)
    Trust.addCallback(id, cb)
    trust.signPersonalMessage(id, data);
  },
  signTypedMessage: function (msgParams, cb) {
    const { data } = msgParams
    const { id = 8888 } = msgParams
    Trust.addCallback(id, cb)
    trust.signTypedMessage(id, JSON.stringify(data))
  }
}, {
    address: addressHex,
    networkVersion: chainID
})
window.web3.setProvider = function () {
  console.debug('Trust Wallet - overrode web3.setProvider')
}
window.web3.eth.defaultAccount = addressHex
window.web3.version.getNetwork = function(cb) {
    cb(null, chainID)
}
window.web3.eth.getCoinbase = function(cb) {
    return cb(null, addressHex)
}