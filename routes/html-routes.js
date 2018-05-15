var db = require("../models");
var express = require("express");
var request = require("request");

module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads the home page with search item
    app.get("/", function (req, res) {
        res.render("index");
    });

    //route for displaying favorites page
    app.get("/favorites", function(req, res){
        res.render("favorites");
    })

    //to delete a favorited item
    app.delete("/api/favorites/:id", function(req, res) {
        db.Favorite.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbFavorite) {
          res.json(dbFavorite);
        });
      });

      //to show the user profile when user clicks on the profile
      app.get("api/user/:id", function(req, res){
        db.User.findOne({
          where: {
            id: req.params.id
          }
        }).then(function(dbUser) {
          res.json(dbUser);
        });      
    })

};

