var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');
    getCoordinates = require('../controllers/coordinates.server.controller.js');
    
module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  
  /* server wrapper around Google Maps API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });
  
  /**TODO
  Serve static files */
  //app.use('/', express.static(__dirname + '/../../client'));
  //app.use('/public', express.static(__dirname + '/../../public'));
  app.use(express.static('client'));

  /**TODO 
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);

  /**TODO 
  Go to homepage for all routes not specified */ 
    //app.use(function(request, response, next){
    app.use('/', express.static('client/index.html'));
    
    //return response.redirect('/');
    //next();
  //});
app.use(passport.initialize());
app.use('/api', routesApi);
  
  return app;
};  
