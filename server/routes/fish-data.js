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
            res.send(fish);
          }
        });
      }
    }
  });
});

//get request from login to recieve the user's fish data
router.post("/", function(req, res){
  var userEmail = req.decodedToken.email;
  var newFish = req.body;
  console.log("We have a bite!", newFish);
  // Check the user's level of permision based on their email
  if(newFish != null) {
    newFish.email = userEmail;
    var fishToAdd = new Fish(newFish);
    fishToAdd.save(function(err){
      if(err){
        console.log('There was an error inserting new fish, ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.delete("/:_id", function(req, res){
  Fish.findByIdAndRemove(
    { _id: req.params._id },
    function(err, data) {
      if(err) {
        console.log('Delete ERR: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

  module.exports = router;
