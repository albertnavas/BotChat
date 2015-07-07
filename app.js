// app.js

var express = require('express')
 	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io')(server)
	, AIMLInterpreter = require('./node_modules/aimlinterpreter/AIMLInterpreter')
	, AIMLFunctions = require("./models/aiml.js")
	, DateFunctions = require("./models/date.js")
	, winston = require('winston')
	, port = process.env.PORT || 3000

// Log system init
winston.add(winston.transports.File, { filename: './logs/'+DateFunctions.getDateToday()+'.log', level: 'info' });

// Server listen
server.listen(port, function () {console.log('Server listening at port %d', port);});

// Static files
app.use(express.static('public'));

// Jade engine
app.set('view engine', 'jade');

// Routes
router = require('./routes/index')(app, express)

// aiml config vars and files
var aimlInterpreter = new AIMLInterpreter(AIMLFunctions.getAimlVars());
aimlInterpreter.loadAIMLFilesIntoArray(AIMLFunctions.getAimlFiles());

// Socket connection
io.on('connection', function (socket) {
	// First message to user
	setTimeout(function(){
		var greet = AIMLFunctions.getRandomGreet();
		winston.info(greet, {pid: process.pid});
		socket.emit('new message', {username: 'Bot', message: greet});
	}, 1000)
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// aiml find expression
		winston.info(data, {pid: process.pid});
		aimlInterpreter.findAnswerInLoadedAIMLFiles(data, function(answer, wildCardArray, input){
			// Get random answer if no aiml match
			if (answer == undefined) {
				answer = AIMLFunctions.getRandomAnswer();
			}
			// Wait 1s and send answer
			setTimeout(function(){
				winston.info(answer, {pid: process.pid});
				socket.emit('new message', {username: 'Bot', message: answer});
			}, 1000)
		});
	});
});


