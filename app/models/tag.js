//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//tag schema
var TagSchema = new Schema({
	category : {type: String, required: true},
	text : {type: String, required: true},
	count: {type: Number, required: true}
});

//return the model
module.exports = mongoose.model('Tag', TagSchema);