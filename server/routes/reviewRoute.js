'use strict';

const { Router } = require('express');
const router = Router();
const { displayReviews } = require('../controllers/reviewCtrl');
const { getRestaurantDetails } = require('../controllers/googlePlacesAPICtrl');

// router.get('/reviews/:id', displayReviews);
router.get('/reviews/:id', getRestaurantDetails, displayReviews);
// router.get('/reviews/:id', displayReviews, getRestaurantDetails);

module.exports = router;
