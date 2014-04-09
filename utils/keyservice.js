var crypto = require('crypto');

var keyService = (function(){
	function generateKeyPair(callback){
		var diffieHellman = crypto.createDiffieHellman(128);
		diffieHellman.generateKeys('hex');

		callback(diffieHellman.getPrivateKey('hex'), diffieHellman.getPublicKey('hex'));
	}

	return {
		generateKeyPair: generateKeyPair
	}
})();

module.exports = openSslClien;

