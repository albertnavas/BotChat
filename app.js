// app.js

var express = require('express')
 	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io')(server)
	, AIMLInterpreter = require('./node_modules/aimlinterpreter/AIMLInterpreter')
	, helpers = require("./models/aiml.js")
	, port = process.env.PORT || 3000

// Server listen
server.listen(port, function () {console.log('Server listening at port %d', port);});

// Static files
app.use(express.static('public'));

// Jade engine
app.set('view engine', 'jade');

// Routes
router = require('./middlewares/router')(app, express)

// aiml config vars and files
var aimlInterpreter = new AIMLInterpreter(helpers.getAimlVars());
aimlInterpreter.loadAIMLFilesIntoArray(helpers.getAimlFiles());

// Socket connection
io.on('connection', function (socket) {
	// First message to user
	setTimeout(function(){
		socket.emit('new message', {username: 'Bot', message: 'Hola!'});
	}, 1000)
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// aiml find expression
		aimlInterpreter.findAnswerInLoadedAIMLFiles(data, function(answer, wildCardArray, input){
			// Get random answer if no aiml match
			if (answer == undefined) {
				answer = helpers.getRandomAnswer();
			}
			// Wait 1s and send answer
			setTimeout(function(){
				socket.emit('new message', {username: 'Bot', message: answer});
			}, 1000)
		});
	});
});


