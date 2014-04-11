var appSettings = require('../config/appConfig');
var fs = require('fs'),
	path = require('path'),
	openssltest = require('../utils/keyservice');

var clientController = (function(){
	var certDir = appSettings.certDir;

	return {
		createDir : function(req,res,next){
			console.log('client handler');
			openssltest.generateKeyPair(function(privateKey, publicKey){
				console.log('Private: '+privateKey);
				console.log('Public: '+publicKey);

				res.send(200,'ok');
				return next();
			});
		}
	}
})();

module.exports = clientController;