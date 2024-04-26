"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:



const auth = require('../controllers/auth.view')
const reservation = require('../controllers/reservation.view')
const room = require('../controllers/room.view')

const router = require('express').Router()




router.all('/', auth.login)
router.all('/home', reservation.list)
router.all('/rooms',room.list)



module.exports = router