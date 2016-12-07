//route we want the fish to swim thru from database
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Fish = require('../models/fish');

//get request from login to recieve the user's fish data
router.get("/", function(req, res){
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if(user == null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        /* Based on the email of the user, give them access to their fish info.
         if there was ever a fishing metaphor with code, "fishing" them out here
         would be quite apt. */
        Fish.find({ email: user.email }, function (err, fish){
          if (err) {
            console.log('Error COMPLETING matching email query task', err);
            res.sendStatus(500);
          } else {
            // reel in (return) the fish chosen by user's email here
            console.log(fish);
            res.send(fish);
          }
        });
      }
    }
  });
});


module.exports = router;
