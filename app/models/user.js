//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//tag schema
var UserSchema = new Schema({
	id: String,
	token: String,
	email: String,
	name: String
});

//return the model
module.exports = mongoose.model('User', UserSchema);