"use strict";

const express = require("express");
const app = express();

//auth
const session = require("express-session");
const passport = require('passport');
const bodyParser = require('body-parser');
const flase = require('express-flash');

app.use(express.static(__dirname + "/client"));

require('dotenv').config();
const port = process.env.PORT || 8080

//models
// app.set("models", require("./server/models"));

app.set('view engine', 'pug');

//routes
const routes = require('./server/routes');

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

//for accessing login info in pug
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(routes);

//server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
