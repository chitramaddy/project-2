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

  //========================================

  //user profile routes. 

  //to show the user when user clicks on show profile. 
  app.get("/user/:id", function (req, res) {
   
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (user) {
      console.log(user.datavalues);
      // var hbsObject = {
      //   userName: res.body.userName,
      //   email: res.body.email,
      //   img_url: res.body.img_url
      // }
      res.render("favorite", user);
    });
  });

  //To update an user information. 
  app.put("/user/:id", function (req, res){
    db.User.update(req.body, 
      {
      where:{
        id: req.body.id
      }
    })
    .then (function(user){
      res.render("favorite", user);
    })
  })

  //Route to deleting a user.
  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (user) {
      res.json("id: "+res.insertId);
    });
  })

  app.get("/cart", function (req, res) {
    db.Cart.findAll().then(function(cartItems){
      console.log(cartItems);
      var hbsObject = {
        cartItems: cartItems
      };
      res.render("cart", hbsObject);
    })
  });

};