// packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// event schema
var EventSchema = new Schema({
    //  author : Schema.Types.ObjectId,
    name : {type: String, required: true},
    address : {type: String, required: false},
    lat : {type: Number, required: true},
    lng : {type: Number, required: true},
    start : {type: String, required: true},
    end : {type: String, required: true},
    styles : [String],
    kind : [String],
    about : {type: String},
    // additional : Schema.Types.ObjectId
});

// return the model
module.exports = mongoose.model('Event', EventSchema)
