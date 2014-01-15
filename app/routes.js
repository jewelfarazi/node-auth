// app/routes.js

// load up the user model
var User 			= require('../app/models/user.js');

module.exports = function(app, passport) {

	// HOME PAGE (with login links)
	app.get('/', isHome, function(req, res) {
		res.render('index', { title: 'Node Authentication' }); // load the index.ejs file from views
	});

	// LOGIN (show the login form)
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if exists
		res.render('login', { title: 'Log in | Node Authenticaiton', message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the login page if there is an error
		failureFlash: true // allow flash message
	}));

	// SIGNUP (show the sign up form)
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup', { title: 'Sign up | Node Authenticaiton', message: req.flash('signupMessage') });
	});

	// process the signup form
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// ==================================
	// PROFILE SECTION ==================
	// ==================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		/*
		res.render('profile', {
			title: 'Welcome!',
			user : req.user // get the user out of the session and pass to template
		});
		*/
		res.json(req.user);

	});

	// ==================================
	// LOGOUT ===========================
	// ==================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if(req.isAuthenticated()) {
		return next();
	}

	// if they aren't redirect them to home page
	res.redirect('/');

}


function isHome(req, res, next) {
	// if user is authenticated in the session, carry on
	if(!req.isAuthenticated()) {
		return next();
	}

	// if they aren't redirect them to home page
	res.redirect('/profile');
}

function isNewUser(req, res, next) {



}