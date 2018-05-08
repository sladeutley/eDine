"use strict";

// get restaurant details based on api placeid


// get reviews based on restaurants' google api id
// module.exports.displayReviews = (req, res, next) => {
//   const { Review } = req.app.get("models");
//   console.log('req',req);

//   Review.findAll({
//     raw: true, //what does this mean?
//     where: { restaurantAPI_id: req.params.id }
//     // where: { restaurantAPI_id: f3c95ad97ca5fca20f88d7d197673ec695ba78d5 }
//   })
//     .then(reviews => {
//       res.render("reviews", { reviews });
//     })
//     .catch(err => {
//       console.log("Something went wrong!", err);
//     });
// };

module.exports.displayReviews = (req, res, next) => {
  const { Review } = req.app.get("models");
  console.log('req',req);

  Review.findAll({
  })
    .then(reviews => {
      console.log('reviews',reviews);
      res.render("reviews", { reviews });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};
