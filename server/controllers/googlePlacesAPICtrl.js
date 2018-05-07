"use strict";

const googlePlacesKey = require('../googlePlacesKey').key;
const https = require('https');

module.exports.searchRestaurantsAPI = (req, res, next) => {


  // https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=restaurant&keyword=${req.query.keyword}&key=${googlePlacesKey}`, (resp) => {
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1326584,-86.7565055&radius=1500&type=restaurant&keyword=Joeys&key=${googlePlacesKey}`, (resp) => {
    let data = '';

      // some of the data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received
      resp.on('end', () => {
    //     console.log(JSON.parse(data).explanation);
          let restaurants = JSON.parse(data);
          // let restaurants = data;
          // res.json(restaurants);
          res.render('restaurants', { restaurants });
      });
    console.log('resp',resp);
    // res.json(resp);
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }


module.exports.displayRestaurantSearch = (req, res, next) => {
  res.render('restaurants', resp); //eventually, need to put object after render path
}