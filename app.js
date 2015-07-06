var express = require('express')
 	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io')(server)
	, AIMLInterpreter = require('./node_modules/aimlinterpreter/AIMLInterpreter')
	, port = process.env.PORT || 3000

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static('public'));


app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
});

app.use(function(req, res, next) {
  res.status(404).send('Esta página no existe!');
});


var aimlInterpreter = new AIMLInterpreter({
	botmaster:'Albert Navas',
	nombre_bot:'Nacloud',
	ciudad:'Barcelona',
	edad:'25',
	ciudadania:'Tokyo',
	anyo_nacimiento:'1990',
});
aimlInterpreter.loadAIMLFilesIntoArray([
	'./aiml/sara.aiml',
	'./aiml/default.aiml',
	'./aiml/nombres.aiml',
	'./aiml/numeros.aiml',
	'./aiml/sexo.aiml',
	'./aiml/sara_srai_1.aiml',
	//'./aiml/sara_srai_2.aiml',
]);
var callback = function(answer, wildCardArray, input){
	console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};
aimlInterpreter.findAnswerInLoadedAIMLFiles('tu nombre', callback);

io.on('connection', function (socket) {
	setTimeout(function(){
		socket.emit('new message', {username: 'Bot', message: 'Hola!'});
	}, 2000)
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
		aimlInterpreter.findAnswerInLoadedAIMLFiles(data, function(answer, wildCardArray, input){
			console.log(answer + ' | ' + wildCardArray + ' | ' + input);
			setTimeout(function(){
				socket.emit('new message', {username: 'Bot', message: answer});
			}, 1000)
		});
	});
});


