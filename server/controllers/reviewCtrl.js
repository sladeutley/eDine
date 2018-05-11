"use strict";

// NEED TO DO AN IF STATEMENT IN PUG WHERE IT DISPLAYS REVIEWS IF restaurantAPI_id EXISTS, IF NOT IT WILL SAY NO REVIEWS EXIST YET

// get reviews based on restaurants' google api id

module.exports.displayReviews = (req, res, next) => {
  const { Review, User } = req.app.get("models");
  console.log("req", req);

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
      res.render("reviews", { reviews: reviews, googleDetails: req.details, id: req.params.id });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};

module.exports.displayReviewForm = (req, res, next) => {
  console.log('req.params.id',req.params.id);
  // res.render(`/new-review/${req.params.id}`);
  let id = req.params.id
  res.render(`new-review`, { id });
}

module.exports.postReview = (req, res, next) => {
  const { Review } = req.app.get("models");

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
