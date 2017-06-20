// packages
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// event schema
var EventSchema = new Schema({
    //  author : Schema.Types.ObjectId,
    name : {type: String, required: true},
    address : {type: String, required: false},
    coords: mongoose.Schema.Types.Mixed,
    start : {type: String, required: true},
    end : {type: String, required: false},
    styles : [String],
    kinds : [String],
    about : {type: String},
    // additional : Schema.Types.ObjectId
});




// return the model
module.exports = mongoose.model('Event', EventSchema)
