var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//the traits of our fish
var fishSchema = new Schema({

    email: { type: String, required: true},
    species: { type: String, required: true},
    fishLength: { type: Number, required: true},
    girth: { type: Number, required: true},
    weight: { type: Number, required: true},
    location: { type: String, required: true},
    gear: { type: String, required: true},
    weather: { type: String, required: true}

});

var Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
