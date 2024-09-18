"use strict";

const router = require("express").Router();

const message = require("../controllers/message");
const { isAdmin, isStaff } = require("../middlewares/permissions");

router.route("/")
.get(isAdmin, isStaff, message.list)
.post(message.create);

router.route("/count")
.get(isAdmin, isStaff, message.count);

router.route("/unread")
.get(isAdmin, isStaff, message.unReadList)

router.route("/unread")
.post(isAdmin, isStaff, message.unReadPost);

router.route("/recent")
.get(isAdmin, isStaff, message.recent);

router
  .route("/:messageId")
  .get(isAdmin, isStaff, message.read)
  .put(isAdmin, message.update)
  .patch(isAdmin, message.update)
  .delete(isAdmin, message.delete);

module.exports = router;
