"use strict";

const googlePlacesKey = require('../googlePlacesKey').key;
const https = require('https');

module.exports.searchRestaurantsAPI = (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${googlePlacesKey}`, (resp) => {
  // https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=${req.query.keyword}&key=${googlePlacesKey}`, (resp) => {
    console.log(navigator.geolocation.getCurrentPosition())
    let data = '';

      // some of the data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received
      resp.on('end', () => {
    //     console.log(JSON.parse(data).explanation);
          res.json(JSON.parse(data));
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