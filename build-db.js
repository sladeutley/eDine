'use strict';

let models = require("./server/models");

models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create({
      username: "slade",
      email: "s@s.com",
      password: "$2a$08$vKpkCX8XotomISdl2lsSZOVvUJwTvoN44H0iH4CZxLC.TC/Lk5L/W"
    });
  })
  .then( () => {
    process.exit();
  });