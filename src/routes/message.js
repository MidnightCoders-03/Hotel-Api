"use strict"

const router = require("express").Router()


const message = require("../controllers/message")
const {isAdmin, isStaff} = require("../middlewares/permissions")

router.route("/")
    .get(message.list)
    .post(message.create)

router.route("/:messageId")
    .get(isAdmin, isStaff, message.read)
    .put(isAdmin, message.update)
    .patch(isAdmin, message.update)
    .delete(isAdmin, message.delete)

module.exports = router