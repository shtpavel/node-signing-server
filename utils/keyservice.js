var crypto = require('crypto'),
	pem = require('pem');

var keyService = (function(){
	function generateKeyPair(callback){
		pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
			callback(keys.serviceKey, keys.clientKey);
		});
	}

	function signData(data, privateKey, callback){
		var sign = crypto.createSign('RSA-SHA256');
		sign.update(data);
		var signature = sign.sign(privateKey, 'hex');
		callback(signature);
	}

	return {
		generateKeyPair: generateKeyPair,
		signData: signData
	};
})();

module.exports = keyService;

