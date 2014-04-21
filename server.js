var restify = require('restify');

var server = restify.createServer({
	name: 'self-signed'
});

server.use(restify.bodyParser());

require('./init/routes')(server);

server.listen(3000, function(){
	console.log('Server started at port: 3000');
});


