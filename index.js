const path = require('path');
const walk = require('walk').walk("./people");

const express = require('express');
const app = express();

var users = [];

//Populate the users variable
walk.on("file", (root, fileStats, next)=> users.push( require( path.join(root, fileStats.name) ) ) );

app.set("template engine", "pug");

app.use("/static", express.static(path.join(__dirname + "static")));

app.get("/", (req, res)=> res.render("./static/views/index.pug"));

app.get("/people", (req, res)=> res.send(users));

app.listen(process.env.PORT || 3000);