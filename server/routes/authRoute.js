'use strict';

const { Router } = require('express');
const router = Router();
// const
const {
  displayRegister,
  register,
  displayLogin,
  login,
  welcome,
  logout
} = require('../controllers/authCtrl.js');

const { getReviewsForWelcomePage } = require('../controllers/reviewCtrl');
const { getRestaurantDetails } = require('../controllers/googlePlacesAPICtrl');

// new users
router.get('/register', displayRegister);
router.post('/register', register);

// login existing users
router.get('/login', displayLogin);
router.post('/login', login);

router.get('/welcome', isLoggedIn, welcome, getReviewsForWelcomePage);
router.post('/logout', logout);

// We add this to the welcome route as an additional step to take before calling
// the controller's 'welcome' method. 'isAuthenticated' is added to the request obj
// If there is a user, then all is well and we call `next()` to move on to the next
// middleware function ( welcome() ). If not, take 'em back to the login page'
// by passport. Coolness
// NOTE that we don't need to export this function. Why?
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next(); //after this next,  we are rendering the welcome page
  res.redirect('/login');
}

module.exports = router;