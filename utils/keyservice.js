var crypto = require('crypto'),
	pem = require('pem');

var keyService = (function(){
	function generateKeyPair(callback){
		pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
			console.log('Private key: ' + keys.serviceKey);
			console.log('Public key: ' + keys.clientKey);
			callback(keys.serviceKey, keys.clientKey);
		});
	}

	function signData(data, privateKey, callback){
		console.log('Tryin\' to sign data: ', data, 'with privateKey: ', privateKey);
		var sign = crypto.createSign('RSA-SHA256');
		sign.update(data);
		console.log('Sign created.');
		var signature = sign.sign(privateKey, 'hex');
		console.log('signature: ', signature);
		callback(signature);
	}

	return {
		generateKeyPair: generateKeyPair,
		signData: signData
	};
})();

module.exports = keyService;

