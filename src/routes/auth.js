"use strict";
/*-------------------------------------------------------
      NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
-------------------------------------------------------*/
const router = require("express").Router();
/*-------------------------------------------------------*/
// Auth Routes:


const Auth = require("../controllers/auth")

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);  //? swagger .all kabul etmiyor

module.exports=router