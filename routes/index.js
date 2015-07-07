// routes.js

module.exports = function(app, express) {
	var router = express.Router();

	// Route
	router.get('/', function(req, res) {
		res.render('index');
	});

	// Other routes
	router.use(function(req, res, next) {
	  res.status(404).send('Esta página no existe!');
	});

	//apply router
    app.use(router);
};