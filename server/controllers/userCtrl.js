"use strict";

const googlePlacesKey = require("../googlePlacesKey").key;
const https = require("https");

module.exports.followUser = (req, res, next) => {
  // let { userFollow, User, Review } = req.app.get("models");
  let { userFollow } = req.app.get("models");

  userFollow
    .create({
      followerId: req.user.id,
      followeeId: req.params.id
    })
    .then(() => {
      // res.status(201).end();
      res.redirect("/welcome");
    })
    .catch(err => {
      console.log("You are already following this user!", err);
      res.status(500).json({ error: err });
      // next(err);
    });
};

// get user info and that user's reviews
module.exports.displayUsersPage = (req, res, next) => {
  let { User, Review } = req.app.get("models");

  User.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Review,
        where: {
          user_id: req.params.id
        }
      }
    ]
  })
    .then(userPage => {
      res.json(userPage);
      // res.render("user", { userPage } );
    })
    .catch(err => {
      console.log("oops!", err);
      res.status(500).json({ error: err });
    });
};

module.exports.displayPeopleUserFollowsReviews = (req, res, next) => {
  let { sequelize } = req.app.get("models");

  console.log("req.user.id", req.user.id);
  sequelize
    .query(
      `
  select * from reviews, users, "userFollows" 
  where reviews.user_id="userFollows"."followeeId" 
  and "userFollows"."followerId"=${req.user.id}
  and users.id=${req.user.id}
  `
    )
    .then(followeesReviews => {
      let promiseArr = [];
      followeesReviews[0].forEach(review => {
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
                    console.log("JSON.parse(data)", JSON.parse(data));
                    // NEED 'dataValues' bc every object's properties is nested in dataValues originally. JSON.parse makes dataValues go away
                    // res.json(JSON.parse(data));
                    // review.dataValues.details = JSON.parse(data);
                    review.result = JSON.parse(data);
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
          res.render("followees-reviews", {
            data: data,
            loggedInUserId: req.user.id
          });
        })
        .catch(err => {
          console.log("oopsies, something went wrong!", err);
          res.status(500).json({ error: err });
        });
    });
};

module.exports.displayAllUsers = (req, res, next) => {
  let { User } = req.app.get("models");

  User.findAll().then(users => {
    // res.json(users);
    res.render('all-users', { users })
  });
};
