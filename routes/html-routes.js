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
    })
};

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/.html"));
// });

// // cms route loads cms.html
// app.get("/cms", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// // blog route loads blog.html
// app.get("/blog", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/blog.html"));
// });

// // authors route loads author-manager.html
// app.get("/authors", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
// });