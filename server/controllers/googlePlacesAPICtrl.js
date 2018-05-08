"use strict";

const googlePlacesKey = require('../googlePlacesKey').key;
const https = require('https');

module.exports.searchRestaurantsAPI = (req, res, next) => {

  console.log('req.query',req.query);

  // https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.long}&radius=1500&type=restaurant&keyword=${req.query.keyword}&key=${googlePlacesKey}`, (resp) => {
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=15000&type=restaurant&keyword=${req.query.keyword}&key=${googlePlacesKey}`, (resp) => {

    let data = '';

      // some of the data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received
      resp.on('end', () => {
    //     console.log(JSON.parse(data).explanation);
          // let restaurants = JSON.parse(data);
          let { results } = JSON.parse(data);
          // let restaurants = data;
          // console.log('results',results);
          // results.forEach(restaurants => {
          //   console.log('restaurants.name',restaurants.name);
          //   res.render('restaurants', { restaurants });            
          // })
          res.render('restaurants', { results })
          // console.log('restaurants.results',restaurants.results);
          // res.json(restaurants);
          // restaurants.forEach(restaurant => {
          //   console.log('restaurant.results',restaurant.results);
          // })
          // console.log('restaurants',restaurants);
          // res.render('restaurants', { restaurants });
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