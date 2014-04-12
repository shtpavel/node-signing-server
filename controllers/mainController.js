var fsLayer = require('../datalayer/fs');
module.exports = (function(){
	function index(req, res, next){
		return fsLayer.getKeys(req.params.client, function(publicKey, privateKey){
			console.log('Finally got them!');
			res.send(200,'ok');
			return next();
		});
	}

	return {
		index: index
	};
})();