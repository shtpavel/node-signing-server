var crypto = require('crypto');

var keyService = (function(){
	function generateKeyPair(callback){
		var diffieHellman = crypto.createDiffieHellman(128);
		diffieHellman.generateKeys('hex');
		privateKey = diffieHellman.getPrivateKey('hex');
		publicKey = diffieHellman.getPublicKey('hex');
		console.log('Private key: ' + privateKey);
		console.log('Public key: ' + publicKey);
		callback(privateKey, publicKey);
	}

	function signData(data, privateKey, callback){
		var sign = crypto.createSign('RSA-SHA256');
		var signature = sign.sign(privateKey, data);
		callback(signature);
	}

	return {
		generateKeyPair: generateKeyPair,
		signData: signData
	};
})();

module.exports = keyService;

