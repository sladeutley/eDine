'use strict';

const { Router } = require('express');
const router = Router();
const { displayReviews, displayReviewForm, postReview, getReviewsForWelcomePage } = require('../controllers/reviewCtrl');
const { getRestaurantDetails } = require('../controllers/googlePlacesAPICtrl');

// router.get('/welcome', getReviewsForWelcomePage);
router.get('/reviews/:id', getRestaurantDetails, displayReviews);
router.get('/new-review/:id', isLoggedIn, displayReviewForm);
router.post('/reviews/:id', postReview);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
