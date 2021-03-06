"use strict";

const googlePlacesKey = require("../googlePlacesKey").key;
const https = require("https");

// NEED TO DO AN IF STATEMENT IN PUG WHERE IT DISPLAYS REVIEWS IF restaurantAPI_id EXISTS, IF NOT IT WILL SAY NO REVIEWS EXIST YET

// get last 20 reviews for welcome page based on your area

module.exports.getReviewsForWelcomePage = (req, res, next) => {
  const { Review, User, userFollow } = req.app.get("models");

  Review.findAll({
    // look for sequelize options for order by and limit (instead of slice thing)
    // where:
    limit: 20,
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: User,
        // need to get info from userFollow join table, so can do an if statement in pug to not display the follow button if the followeeId already exists, and the logged in users id is the same as the followerId on the join table
        include: [
          {
            model: User,
            as: "userFollowed"
            // where: {followerId: req.user.id}
          }
        ]
      }
    ]
  }).then(reviews => {
    let promiseArr = [];
    reviews.forEach(review => {
      // must push each resolve (from a promise) into the promise all (promiseArr) array
      promiseArr.push(
        new Promise((resolve, reject) => {
          https
            .get(
              `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
                review.restaurantAPI_id
              }&key=${googlePlacesKey}`,
              resp => {
                let data = ""; // some of the data has been recieved.

                resp.on("data", chunk => {
                  data += chunk;
                }); // The whole response has been received

                resp.on("end", () => {
                  // console.log("JSON.parse(data)", JSON.parse(data));
                  // NEED 'dataValues' bc every object's properties is nested in dataValues originally. JSON.parse makes dataValues go away
                  review.dataValues.details = JSON.parse(data);
                  // review.dataValues.details.restaurantImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${review.dataValues.details.result.photos[0].photo_reference}&key=${googlePlacesKey}` 
                  review.dataValues.details.result ? review.dataValues.details.restaurantImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${review.dataValues.details.result.photos[0].photo_reference}&key=${googlePlacesKey}` : review.dataValues.details.restaurantDefaultImage =("../client/img/no_image_available.jpg");

                  // review.dataValues.loggedInUserId = req.user.id;
                  resolve(review);
                });
              }
            )
            .on("error", err => {
              console.log("Error: " + err.message);
            });
        })
      );
    });
    Promise.all(promiseArr)
      .then(data => {
        // data.dataValues.loggedInUserId = req.user.id;
        console.log("data", data);
        // res.json(data);
        console.log("req.user.id", req.user.id);
        // res.render("welcome", { data } );
        res.render("welcome", { data: data, loggedInUserId: req.user.id });
      })
      .catch(err => {
        console.log("oopsies, something went wrong!", err);
        res.status(500).json({ error: err });
      });
  });
};

// get reviews based on restaurants' google api id

module.exports.displayReviews = (req, res, next) => {
  const { Review, User } = req.app.get("models");

  Review.findAll({
    // raw: true, //what does this mean? DONT NEED THIS HERE BC IT WONT NEST OBJECTS (user) FOR YOU
    where: { restaurantAPI_id: req.params.id },
    include: [
      {
        model: User
      }
    ]
  })
    .then(reviews => {
      console.log("req.details.result.name", req.details.result.name);
      res.render("reviews", {
        reviews: reviews,
        googleDetails: req.details,
        id: req.params.id
      });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};

module.exports.displayReviewForm = (req, res, next) => {
  console.log("req.params.id", req.params.id);
  // res.render(`/new-review/${req.params.id}`);
  let id = req.params.id;
  res.render(`new-review`, { id });
};

module.exports.postReview = (req, res, next) => {
  const { Review } = req.app.get("models");

  console.log("req.details", req.details);
  Review.create({
    restaurantAPI_id: req.params.id,
    review_description: req.body.review_description,
    star_rating: req.body.star_rating,
    location: req.body.location,
    createdAt: null,
    updatedAt: null,
    user_id: req.user.id
  })
    .then(review => {
      res.redirect(`/reviews/${req.params.id}`);
    })
    .catch(err => {
      console.log("oopsies, something went wrong!", err);
      res.status(500).json({ error: err });
    });
};
