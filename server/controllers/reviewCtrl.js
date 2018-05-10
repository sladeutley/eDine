"use strict";

// NEED TO DO AN IF STATEMENT IN PUG WHERE IT DISPLAYS REVIEWS IF restaurantAPI_id EXISTS, IF NOT IT WILL SAY NO REVIEWS EXIST YET


// get reviews based on restaurants' google api id


module.exports.displayReviews = (req, res, next) => {
  const { Review, User } = req.app.get("models");
  console.log('req',req);

  Review.findAll({
    // raw: true, //what does this mean? DONT NEED THIS HERE BC IT WONT NEST OBJECTS (user) FOR YOU
    where: { restaurantAPI_id: req.params.id },
    include: [{
      model: User
    }]
  })
    .then(reviews => {
      // console.log('reviews',{ reviews });
      // res.render("reviews", { reviews });
      // console.log('reviews', JSON.parse(reviews));
      // res.json(reviews);
      // console.log("sweet data", { reviews: reviews, googleDetails: req.details });
      res.render("reviews", { reviews: reviews, googleDetails: req.details });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};
