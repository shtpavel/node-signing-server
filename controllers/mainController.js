var fsLayer = require('../datalayer/fs'),
	keyservice = require('../utils/keyservice');

module.exports = (function(){
	function index(req, res, next){
		return fsLayer.getKeys(req.params.client, function(privateKey, publicKey){
			keyservice.signData("aaaa",privateKey, function(sig){
				res.send(200,{
					signature: sig,
					publicKey: publicKey
				});
				return next();
			});
			
		});
	}

	return {
		index: index
	};
})();