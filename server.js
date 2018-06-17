//Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// set up our port to be eitherthe host's designated port, or 3000
var PORT = process.env.PORT || 8000;

//Instantiate our Express  App
var app = express();

//Set Up an Express Router
var router = express.Router();
//Require our routes file pass our router object
require("./config/routes.js")(router);


//Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));


// Connect handlebars to express app
app.engine("handlebars", expressHandlebars({ 
}));
app.set("view engine", "handlebars");

//Use bodyParser in our app
app.use(bodyParser.urlencoded({
     extended: false
     }));


//Have every request go through our router middleware
app.use(router);

//If deployed, use the deployed database. Otherwise use the local mongoHeadLines database
var db = process.env.MONGODB_URI ||"mongodb://localhost/mongoHeadlines";

//Connect mongoose to our database
mongoose.connect(db, function(error) {
    //Log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //Or log a success message
    else {
        console.log("MONGOOSE CONNECTION SUCCESSFUL");
        app.listen(PORT, function() {
            console.log("Listening on the port: " + PORT);
        });
    }
 });







