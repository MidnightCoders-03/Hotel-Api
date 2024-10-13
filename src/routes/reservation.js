"use strict"

const router = require("express").Router()


const reservation = require("../controllers/reservation")
const permissions = require("../middlewares/permissions")

router.route("/")
    // .get(permissions.isLogin, reservation.list)
    // .post(permissions.isLogin, reservation.create)
    .get(reservation.list)
    .post(reservation.create)

router.route("/:reservationId")
    .get(permissions.isLogin, reservation.read)
    .put(permissions.isAdmin, reservation.update)
    .patch(permissions.isAdmin, reservation.update)
    .delete(permissions.isAdmin, reservation.delete)

module.exports = router