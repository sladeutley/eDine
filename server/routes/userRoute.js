'use strict';

const { Router } = require('express');
const router = Router();

const { followUser, displayUsersPage, displayPeopleUserFollowsReviews } = require('../controllers/userCtrl');

router.post(`/follow-user/:id`, followUser);
router.get('/user/:id', displayUsersPage);
router.get('/followees-reviews', displayPeopleUserFollowsReviews);

module.exports = router;