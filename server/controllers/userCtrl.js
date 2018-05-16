"use strict";

module.exports.followUser = (req, res, next) => {
  // let { userFollow, User, Review } = req.app.get("models");
  let { userFollow } = req.app.get("models");

  userFollow
    .create({
      followerId: req.user.id,
      followeeId: req.params.id
    })
    .then(() => {
      // res.status(201).end();
      res.redirect("/welcome");
    })
    .catch(err => {
      console.log("You are already following this user!", err);
      res.status(500).json({ error: err });
      // next(err);
    });
};

// get user info and that user's reviews
module.exports.displayUsersPage = (req, res, next) => {
  let { User, Review } = req.app.get("models");

  User.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Review,
        where: {
          user_id: req.params.id
        }
      }
    ]
  })
    .then(userPage => {
      res.json(userPage);
      // res.render("user", { userPage } );
    })
    .catch(err => {
      console.log("oops!", err);
      res.status(500).json({ error: err });
    });
};

module.exports.displayPeopleUserFollowsReviews = (req, res, next) => {
  let { sequelize } = req.app.get("models");

  console.log("req.user.id", req.user.id);
  sequelize.query(`
  select * from reviews, "userFollows" 
  where reviews.user_id="userFollows"."followeeId" 
  and "userFollows"."followerId"=${req.user.id};
  `)
    .then(followeesReviews => {
      res.json(followeesReviews[0]);
    })
    .catch(err => {
      console.log("oops!", err);
      res.status(500).json({ error: err });
    });
};
