"use strict"

const router = require("express").Router()


const reservation = require("../controllers/reservation")
const permissions = require("../middlewares/permissions")

router.route("/")
.get(permissions.isLogin, reservation.list)
.post(permissions.isLogin, reservation.create)

router.route("/:id")
.get(permissions.isLogin, reservation.read)
.put(permissions.isAdmin, reservation.read)
.patch(permissions.isAdmin, reservation.read)
.delete(permissions.isAdmin, reservation.read)

module.exports = router