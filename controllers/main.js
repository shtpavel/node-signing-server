var mainController = (function (){
	var numberGen = function(){
		number = Math.random();
	}

	return {
		index: function(req, res, next){
			res.send('Hello from restify!');
			return next();
		}
	}
})();

module.exports = mainController;