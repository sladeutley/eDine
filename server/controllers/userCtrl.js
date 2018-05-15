'use strict';

module.exports.followUser = (req, res, next) => {
  let { userFollow, User, Review } = req.app.get("models");

  console.log('req.params.id',req.params.id);

  userFollow.create({
    followerId: req.user.id,
    followeeId: req.params.id
  })
  .then(() => {
    // res.status(201).end();
    res.redirect('/welcome');
  })
  .catch(err => {
    console.log("You are already following this user!", err);
    res.status(500).json({ error: err });    
    // next(err);
  })
}