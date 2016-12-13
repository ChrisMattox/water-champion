var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//fisherman or womans schema. email only, it's what we'll check against fish in the database
var userSchema = new Schema({

  email: { type: String, required: true, unique: true }

});

var User = mongoose.model('User', userSchema);

module.exports = User;
