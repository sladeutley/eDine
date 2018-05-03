"use strict";

const express = require("express");
const app = express();

//auth
const session = require("express-session");
const passport = require('passport');
const bodyParser = require('body-parser');

//routes
const routes = require('./server/routes');

//models
// app.set("models", require("./server/models"));

app.use(express.static(__dirname + "/client"));

//auth
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

require("./server/config/passport-strat.js");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

//server
app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
