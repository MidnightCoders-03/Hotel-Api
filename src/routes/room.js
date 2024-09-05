"use strict";
/*-------------------------------------------------------
      NODEJS EXPRESS | HOTEL RESERVATION API
-------------------------------------------------------*/
const router = require("express").Router();
/*-------------------------------------------------------*/
// Room Routes:

const Room = require("../controllers/room");
const { isAdmin, isStaff } = require("../middlewares/permissions")

router.route("/").get(Room.list).post(isAdmin || isStaff,Room.create);

router
  .route("/:roomId")
  .get(Room.read)
  .put(Room.update)
  .patch(Room.update)
  .delete(Room.delete);

module.exports = router;
