var fs = require('fs'),
	path = require('path'),
	appConfig = require('../config/appConfig'),
	keyservice = require('../utils/keyservice');

var fsLayer = (function(){
	var storeDir = appConfig.storeDir;
	var privateFileName = 'private.key';
	var publicFileName = 'public.key';

	function saveKeys(client, privateKey, publicKey, callback){
		var companyDir = path.join(storeDir, client);
		fs.exists(companyDir,function(exist){
			if (!exist) {
				fs.mkdirSync(companyDir);
			}
			fs.writeFile(path.join(companyDir, publicFileName), publicKey, function(err){
				if (err) throw err;
				console.log('Public key saved to ' + companyDir);
			});
			fs.writeFile(path.join(companyDir, privateFileName), privateKey, function(err){
				if (err) throw err;
				console.log('Private key saved to ' + companyDir);
			});

			if (callback)
				callback(privateKey, publicKey);
		});
	}

	function getKeys(client, callback){
		var privateKeyPath = path.join(storeDir, client, privateFileName);
		var publicKeyPath = path.join(storeDir, client, publicFileName);
		console.log("Private key path: ", privateKeyPath);
		console.log("Public key path: ", publicKeyPath);

		fs.exists(privateKeyPath, function(exists){
			if (exists) {
				console.log('Path exists');
				fs.readFile(privateKeyPath,'utf8', function(err,privateKey){
					if (err) throw err;
					fs.readFile(publicKeyPath,'utf8', function(err,publicKey){
						if(err) throw err;
						console.log('Private key: ', privateKey);
						console.log('Public key: ', publicKey);
						callback(privateKey, publicKey);
					});
				});
			} else {
				console.log('Path doesn\'t exists');
				keyservice.generateKeyPair(function(privateKey, publicKey){
					saveKeys(client, privateKey, publicKey, function(privateKey, publicKey){
						console.log('Keys was saved');
						console.log('Private key: ', privateKey);
						console.log('Public key: ', publicKey);
						callback(privateKey, publicKey);
					});
				});
			}
		});
	}

	return{
		getKeys: getKeys
	};
})();

module.exports = fsLayer;