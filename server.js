var restify = require('restify');

var mainController = require('./controllers/mainController');

var server = restify.createServer({
	name: 'self-signed'
});

server.put('/:client', mainController.index);

server.listen(3000, function(){
	console.log('Server started at port: 3000');
});


