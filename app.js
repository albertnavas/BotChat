// app.js

var express = require('express')
 	, app = express()
 	, fs = require('fs')
	, server = require('http').createServer(app)
	, io = require('socket.io')(server)
	, AIMLInterpreter = require('aimlinterpreter')
	, AIMLFunctions = require(__dirname + "/models/aiml.js")
	, DateFunctions = require(__dirname + "/models/date.js")
	, winston = require('winston')
	, UglifyJS = require("uglify-js")
	, pug = require('pug')
	, stylus = require('stylus')
	, nib = require('nib')
	, port = process.env.PORT || 3000

// Minify js
var result = UglifyJS.minify(__dirname + '/public/js/main.js');
fs.writeFile(__dirname + '/public/js/main.min.js', result.code, function (err) {if (err) return console.log(err);});

// Compile and minify stylus
function compile(str, path) {
	return stylus(str).set('filename', path).set('compress', true).use(nib());
}
app.use(stylus.middleware({
    src: __dirname + '/public', dest: __dirname + '/public', compile: compile
}));

// Log system init
winston.add(winston.transports.File, { filename: __dirname + '/logs/'+DateFunctions.getDateToday()+'.log', level: 'info' });

// Server listen
server.listen(port, function () {console.log('Server listening at port %d', port);});

// Static files
app.use(express.static(__dirname + '/public'));

// Pug engine
app.set('view engine', 'pug');

// Routes
router = require(__dirname + '/routes/index')(app, express)

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


