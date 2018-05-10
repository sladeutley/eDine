"use strict";

const googlePlacesKey = require("../googlePlacesKey").key;
const https = require("https");

module.exports.searchRestaurantsAPI = (req, res, next) => {
  console.log("req.query", req.query);

  // https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.long}&radius=1500&type=restaurant&keyword=${req.query.keyword}&key=${googlePlacesKey}`, (resp) => {
  https
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        req.query.latitude
      },${req.query.longitude}&radius=10000&type=restaurant&keyword=${
        req.query.keyword
      }&key=${googlePlacesKey}`,
      resp => {
        let data = ""; // some of the data has been recieved.

        resp.on("data", chunk => {
          data += chunk;
        }); // The whole response has been received

        resp.on("end", () => {
          console.log("restaurants", JSON.parse(data));
          let { results } = JSON.parse(data);
          console.log("results", results);
          res.render("restaurants", { results });
        });
        console.log("resp", resp);
        // res.json(resp);
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};

module.exports.getRestaurantDetails = (req, res, next) => {
  console.log("req.params.id", req.params.id);

  https
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
        req.params.id
      }&key=${googlePlacesKey}`,
      resp => {
        let data = ""; // some of the data has been recieved.

        resp.on("data", chunk => {
          data += chunk;
        }); // The whole response has been received

        resp.on("end", () => {
          
          req.details =   JSON.parse(data);
          // need next bc can only render once
          next();
        });
        // console.log('resp',resp);
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};

module.exports.displayRestaurantSearch = (req, res, next) => {
  res.render("restaurants", resp); //eventually, need to put object after render path
};
