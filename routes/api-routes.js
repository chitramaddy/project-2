require("dotenv").config();

var db = require("../models");
var request = require("request");
var keys = require("../keys");

var id = keys.yummly.app_id;
var key = keys.yummly.app_key;


function fixImage(resObject) {
  for (var i = 0; i < resObject.matches.length; i++) {
    if (resObject.matches.length[i]) {
      var img = resObject.matches[i].smallImageUrls[0];
      img = img.slice(0, -2);
      img = img + "300";
      resObject.matches[i].smallImageUrls = {
        smallImageUrls: img
      };
      resObject.matches[i].totalTimeInSeconds = resObject.matches[i].totalTimeInSeconds / 60;
    }
  }
  return resObject;
}


module.exports = function (app) {

  //route for creating a user and adding the user to the database
  app.post("/api/user", function (req, res) {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      img_url: req.body.img_url,
      created_at: req.body.created_at
    }).then(function (results) {
      // `results` here would be the newly created user
      console.log("added user");
    });
  });

  app.post("/api/recipes/", function (req, res) {
    var query = req.body.query;
    var ingredients = req.body.ingredients;
    console.log(query);
    console.log(ingredients);
    request("http://api.yummly.com/v1/api/recipes?_app_id=" + id + "&_app_key=" + key + "&q=" + query,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //  have to parse the response to JSON
          var response = JSON.parse(body);
        }
        response = fixImage(response);
        res.send(response);
      })
  });

  //one way of doing it

  //when the heart is clicked,
  //store that results.matches[i].id in favorites table
  //when the favorites page is loaded get all the items on the favorite page to load

  //Where as the other way is to send a request for a specific id 
  app.get("/recipes/:id", function (req, res) {
    var id = req.params.id;

    request("http://api.yummly.com/v1/api/recipe/" + id + "?_app_id=" + app_id + "&_app_key=" + app_key,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //  have to parse the response to JSON
          hbsObject = JSON.parse(body);
        }
        //  this is some weird chopping up of the image URL since it only comes as a small size and there arent any options to change it
        //  get rid of the "90" and then add the correct size in the index.handlebars.... a little hacky but whatever
        fixImage(hbsObject);
        //console.log(hbsObject);
        res.send(hbsObject);
      })
  });
}