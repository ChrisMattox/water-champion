//route we want the fish to swim thru from database
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var Fish = require('../models/fish');
var Upload = require('../models/uploads');
var multer = require('multer');
var upload = multer({dest: 'public/uploads/'});

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

router.post('/test', upload.single('file'), function (req, res, next) {
  console.log("post hit");
  // console.log("reqbody", req.body);
  // console.log("reqfile", req.file);
  var userEmail = req.decodedToken.email;
  var newFish = req.body;
  var newUpload = {
    created: Date.now(),
    file: req.file
  };
  Upload.create(newUpload, function (err, next){
    if (err) {
      next(err);
    } else {
      console.log("We have a bite!", newFish);
      //
      if(newFish != null) {
        newFish.email = userEmail;
        newFish.image = newUpload.file.filename
        var fishToAdd = new Fish(newFish);
        console.log("FishToAdd", fishToAdd);
        fishToAdd.save(function(err){
          if(err){
            console.log('There was an error inserting new fish, ', err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      } else {
        console.log("hitting THIS post on imgupload");
      }
    }
  });
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
  /**
  * Gets the list of all files from the database
  */
router.get('/test', function (req, res, next) {
  Upload.find({},  function (err, uploads) {
    if (err) next(err);
      else {
        res.send(uploads);
      }
  });
});

  /**
  * Gets a file from the hard drive based on the unique ID and the filename
  */
router.get('/:uuid/:filename', function (req, res, next) {
  console.log(req.params);
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, upload) {
    if (err) next(err);
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
        fs.createReadStream(upload.file.path).pipe(res);
      }
    });
});

module.exports = router;
