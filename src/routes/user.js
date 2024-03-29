"use strict";
/*-------------------------------------------------------
      NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
-------------------------------------------------------*/
const router = require("express").Router();
/*-------------------------------------------------------*/
// User Routes:

const User = require("../controllers/user");

//login -logout üstte olmalı yoksa /userId ile karışır hata verir
router.post("/login", User.login);
router.post("/logout", User.logout); 

router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);

module.exports = router;
