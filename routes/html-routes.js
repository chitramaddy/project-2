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
  app.get("api/favorites", function (req, res) {
    db.Favorite.findAll({})
      .then(function (dbFavorite) {
        res.json(dbFavorite);
      });

  });

  //to delete a favorited item
  app.delete("/api/favorites/:id", function (req, res) {
    db.Favorite.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbFavorite) {
      res.json(dbFavorite);
    });
  });

  //to show the user when user clicks on show profile. Writing this as api route for checking. eventually this needs to be written as html route
  app.get("/api/user/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  })

};