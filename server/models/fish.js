var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fishSchema = new Schema({
    email: { type: String, required: true, unique: true }
});

var Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
