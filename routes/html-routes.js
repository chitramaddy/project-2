var db = require("../models");
var express = require("express");
var request = require("request");

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads the home page with search item
  app.get("/", function (req, res) {
    var user = req.user;
    var style = "style=" + "\"" + "display:block;" + "\"";
    var styleT = {
      userTrue: style
    }
    var styleF = {
      userFalse: style
    }
    if(user){
      res.render("index", styleT);
    } else {
      res.render("index", styleF);
    }
  });

  app.get("/profile/", function (req, res) {
    //set variable to the current user
    var userSession = req.user;
    //if current user exists then send to the correct page, otherwise send user back to index page for now
    if (userSession){
      var user = {
        where: {
          id: userSession.id
        },
        include: [db.Favorite]
      }
      db.User.findOne(user).then(function (data) {
        console.log("this might return the foreign key");
        //console.log(data);
        var hbsObject = {
          data: data.dataValues,
          favoritesData: data.Favorites
        }
        console.log(hbsObject.favoritesData);
        res.render("profile", hbsObject);
      })


    } else {
      res.render("index");
    }
  });

  app.get("/cart/", function (req, res) {
    var userSession = req.user;
    if(userSession){
      id = req.user.id;
      db.Cart.findAll({
        where: id,
        include: [db.User]
      }).then(function(item){
        console.log(item);
        res.json(item);
      })
    }

  })

};