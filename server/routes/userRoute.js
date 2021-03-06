"use strict";

const { Router } = require("express");
const router = Router();

const {
  followUser,
  displayUsersPage,
  displayLoggedInUsersProfilePage,
  displayPeopleUserFollows,
  displayPeopleUserFollowsReviews,
  displayAllUsers
} = require("../controllers/userCtrl");

router.post(`/follow-user/:id`, followUser);
router.get("/user", isLoggedIn, displayLoggedInUsersProfilePage);
router.get("/user/:id", isLoggedIn, displayUsersPage, followUser);
router.get("/followees", isLoggedIn, displayPeopleUserFollows);
router.get("/followees-reviews", isLoggedIn, displayPeopleUserFollowsReviews);
router.get("/all-users", displayAllUsers);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
