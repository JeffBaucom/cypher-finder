// BASE SETUP ===================================
/*
 * module dependencies
 */

var express    = require('express'); // use express for routing
var app        = express(); // expose app
var mongoose   = require('mongoose'); //
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var config     = require('./config');
var path       = require('path');
var port       = config.port;

mongoose.set('debug', true);


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// set CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// use morgan to output requests to terminal
app.use(morgan('dev'));

// connect to MongoDB
mongoose.connect(config.db);

// link static files for frontend requests
app.use(express.static(__dirname + '/public'));

// ROUTING ======================================
//
var eventsRoutes = require('./app/routes/events')(app, express);
app.use('/events', eventsRoutes);

var tagsRoutes = require('./app/routes/tags')(app, express);
app.use('/tags', tagsRoutes);

//var userRoutes = require('./app/routes/users')(app, express);
//app.use('/users', userRoutes);

//catch-all route to homepage
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// start the server
app.listen(port);
console.log('Magic happens on port ' + port); 
