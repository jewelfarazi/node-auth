// app/models/user.js
// load the things we need
var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
	email	 	: String,
	password 	: String,
	firstname	: String,
	lastname	: String
});

// methods ===============================
// checking if password is valid using bcrypt
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// this method hashes the password and sets the users password
// this method to generate hashes the password and sets the users password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);