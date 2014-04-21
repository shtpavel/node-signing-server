var fs = require('fs'),
	path = require('path'),
	appConfig = require('../config/config'),
	keyservice = require('../utils/keyservice');

var fsLayer = (function(){
	var storeDir = appConfig.storeDir,
		privateFileName = 'private.key',
		publicFileName = 'public.key';

	function saveKeys(client, privateKey, publicKey, callback){
		var companyDir = path.join(storeDir, client);
		fs.exists(storeDir, function(exist){
			if (!exist)
				fs.mkdirSync(storeDir);

			fs.exists(companyDir,function(exist){
				if (!exist)
					fs.mkdirSync(companyDir);
				
				fs.writeFile(path.join(companyDir, publicFileName), publicKey, function(err){
					if (err) return callback(err);
				});
				fs.writeFile(path.join(companyDir, privateFileName), privateKey, function(err){
					if (err) return callback(err);
				});

				return callback(null, privateKey, publicKey);
			});
		});
	}

	function getKeys(client, createIfNoKey, callback){
		var privateKeyPath = path.join(storeDir, client, privateFileName),
			publicKeyPath = path.join(storeDir, client, publicFileName);

		fs.exists(privateKeyPath, function(exists){
			if (exists) {
				fs.readFile(privateKeyPath,'utf8', function(err,privateKey){
					if (err) throw err;
					fs.readFile(publicKeyPath,'utf8', function(err,publicKey){
						if(err) throw err;
						callback(null, privateKey, publicKey);
					});
				});
			} else {
				if (!createIfNoKey) {
					return callback(new Error('Can\'t find key for selected company.'));
				}
				keyservice.generateKeyPair(function(privateKey, publicKey){
					saveKeys(client, privateKey, publicKey, function(err, privateKey, publicKey){
						return callback(null, privateKey, publicKey);
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