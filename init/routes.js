var mainController = require('../controllers/mainController');

module.exports = function(server){
	server.put('/:client/key', mainController.key);
	server.get('/:client/key', mainController.publicKey);
	server.post('/:client/sign', mainController.sign);
};