"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const auth = require('../controllers/auth.view')
const reservation = require('../controllers/reservation.view')
const room = require('../controllers/room.view')

const router = require('express').Router()


router.all('/', room.list)
router.all('/home', reservation.list)
router.all('/rooms', room.list)

// router.get('/create', todo.create) // form view
// router.post('/create', todo.create) // form send
// router.all('/create', todo.create)

// router.all('/:id', todo.read)

// router.all('/:id/update', todo.update)

// router.all('/:id/delete', todo.delete)


module.exports = router