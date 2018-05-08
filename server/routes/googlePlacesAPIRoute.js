'use strict';

const { Router } = require('express');
const router = Router();
const { searchRestaurantsAPI } = require('../controllers/googlePlacesAPICtrl');

router.get('/restaurants', searchRestaurantsAPI);


module.exports = router;
