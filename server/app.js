//what this needs to talk to the database
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var fishData = require('./routes/fish-data');
var portDecision = process.env.PORT || 3000;


app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));

//parse that data. descaling the fish
app.use(bodyParser.json());

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
app.use(decoder.token);

/* Whatever you do below this is protected by your authentication. */

// This is the route for your fishData. The request gets here after it has been authenticated.
app.use("/fishData", fishData);

mongoConnection.connect();

app.listen(portDecision, function(){
  console.log("Magic happening on port: ", portDecision);
});
