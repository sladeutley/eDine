'use strict';

const { Router } = require('express');
const router = Router();

const { followUser } = require('../controllers/userCtrl');

router.post(`/follow-user/:id`, followUser);

module.exports = router;