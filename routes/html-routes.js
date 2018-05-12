var db = require("../models");
var express = require("express");
var request = require("request");

var app_id = "3f2c9a8d";
var app_key = "e92f49e132a104a2da4588b89f9f4eea";

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

    app.delete("/api/favorites/:id", function(req, res) {
        db.Favorite.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbFavorite) {
          res.json(dbFavorite);
        });
      });
    


};

