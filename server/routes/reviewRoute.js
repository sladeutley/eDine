'use strict';

const { Router } = require('express');
const router = Router();
const { displayReviews, displayReviewForm, postReview } = require('../controllers/reviewCtrl');
const { getRestaurantDetails } = require('../controllers/googlePlacesAPICtrl');

router.get('/reviews/:id', getRestaurantDetails, displayReviews);
router.get('/new-review/:id', displayReviewForm);
router.post('/reviews/:id', postReview);

module.exports = router;
