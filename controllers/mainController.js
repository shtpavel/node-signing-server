var fsLayer = require('../datalayer/fs'),
	keyservice = require('../utils/keyservice');

module.exports = (function(){
	function sign(req, res, next){
		return fsLayer.getKeys(req.params.client, false, function(err, privateKey, publicKey){
			if (err) {
				res.send(404,{
					error: JSON.stringify(err, ['message'], 2)
				});
				return next();
			}
			keyservice.signData(req.body.data, privateKey, function(sig){
				res.send(200,{
					signature: sig,
					publicKey: publicKey
				});
				return next();
			});
			
		});
	}

	function key(createKey){
		return function(req, res, next){
			return fsLayer.getKeys(req.params.client, createKey, function(err, privateKey, publicKey){
				if (err) {
					res.send(404,{
						error: JSON.stringify(err, ['message'], 2)
					});
					return next();
				}
				res.send(200, {
					publicKey: publicKey
				});
				return next();
			});
		};
	}


	return {
		sign: sign,
		key: key(true),
		publicKey: key(false)		
	};
})();