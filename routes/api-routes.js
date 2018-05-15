require("dotenv").config();

var db = require("../models");
var request = require("request");
var keys = require("../keys");

var app_id = keys.yummly.app_id;
var app_key = keys.yummly.app_key;


function fixImage(resObject) {
  for (var i = 0; i < resObject.matches.length; i++) {
    if (resObject.matches[i].smallImageUrls) {
      var img = resObject.matches[i].smallImageUrls[0];
      resObject.matches[i].smallImageUrls = img.slice(0, -2) + "300";
      resObject.matches[i].totalTimeInSeconds = resObject.matches[i].totalTimeInSeconds / 60;
    }
  }
  return resObject;
}

module.exports = function (app) {

  //route for creating a user and adding the user to the database
  app.post("/api/user", function (req, res) {
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

  app.post("/recipes/", function (req, res) {
    //String
    var query = req.body;
    console.log(query);
    var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + app_id + "&_app_key=" + app_key + "&q=";
    // //Arrays
    var ingredients = query.ingredients;
    // var intolerances = req.body.intolerances;
    function searchIngredients() {
      if (ingredients.length > 0) {
        //go through the array and construct each of the ampersand queries
        for (var i = 0; i < ingredients.length; i++) {
          queryURL += ingredients[i] + "+";
        }
      }
      includeCuisines();
    }

    function includeCuisines() {
      var cuisines = query.cuisines;
      if (cuisines.length > 0) {
        for (var i = 0; i < cuisines.length; i++) {
          queryURL += "&allowedCuisine[]=" + cuisines[i] + "+";
        }
        includeDiet();
      }
    }

    function includeDiet() {
      var diets = query.diets;
      if (diets.length > 0) {
        for (var i = 0; i < diets.length; i++) {
          queryURL += "&allowedDiet[]=" + diets[i] + "+";
        }
      }
      excludeAllergies();
    }

    function excludeAllergies() {
      var intolerances = query.intolerances;
      if (intolerances.length > 0) {
        for (var i = 0; i < intolerances.length; i++) {
          queryURL += "&allowedAllergy[]=" + intolerances[i] + "+";
        }
      }
    }
    searchIngredients();
    console.log(queryURL);
    request(queryURL,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //  have to parse the response to JSON
          var response = JSON.parse(body);
        }
        response = fixImage(response);
        res.send(response);

        if(!response){
          res.send("0 matches found");
        }
      })
  });

  app.get("/recipes/:id", function (req, res) {
    var recipeId = req.params.id;
    request("http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + app_id + "&_app_key=" + app_key,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //  have to parse the response to JSON
          var recipe = JSON.parse(body);
        }
        res.send(recipe);
      })
  });
}