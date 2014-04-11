var restify = require('restify');

var mainController = require('./controllers/main'),
	clientController = require('./controllers/client');

var server = restify.createServer({
	name: 'self-signed'
});

server.get('/', mainController.index);
server.put('/:client', clientController.client);

server.listen(3000, function(){
	console.log('Server started at port: 3000');
});


