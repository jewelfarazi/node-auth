
// server.js

// set up =============================================
// get all the tools we need
var express		= require('express');
var path 		= require('path');
var app 		= express();
var port 		= process.env.PORT || 3000;
var mongoose 	= require('mongoose');
var passport 	= require('passport');
var flash		= require('connect-flash');

var configDB	= require('./config/database.js');

// app configuration ==================================
mongoose.connect(configDB.url);	// connect to our database
//mongoose.connect("mongodb://localhost/helloExpress");

require('./config/passport')(passport); // pass passport for configuration

// set up our express environment
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.bodyParser());
app.use(express.cookieParser());
// required for passport
app.use(express.session({ secret: 'iloveyouavaailoveyou'}));
/*
app.use(express.session({   store: sessionStore,
                            cookie: { maxAge : 3600000 } //1 Hour
                            }));
*/
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));

// routes ==============================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ==============================================
app.listen(port);
console.log('Node authentication server is running on port ' + port);