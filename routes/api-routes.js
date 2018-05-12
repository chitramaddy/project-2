var db = require("../models");
var request = require("request");

var app_id = "3f2c9a8d";
var app_key = "e92f49e132a104a2da4588b89f9f4eea";


module.exports = function (app) {

  //route for creating a user and adding the user to the database
  app.post("/api/user", function (req, res) {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
     // img_url: req.body.img_url,
      created_at: req.body.created_at
    }).then(function (results) {
      // `results` here would be the newly created user
      console.log("added user");

    });
  });
}