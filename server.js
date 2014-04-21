var restify = require('restify');

var mainController = require('./controllers/mainController');

var server = restify.createServer({
	name: 'self-signed'
});

server.use(restify.bodyParser());

server.put('/:client/key', mainController.key);
server.get('/:client/key', mainController.publicKey);
server.get('/:client/sign', mainController.sign);

server.listen(3000, function(){
	console.log('Server started at port: 3000');
});


