"use strict";
/*-------------------------------------------------------
      NODEJS EXPRESS | HOTEL RESERVATION API
-------------------------------------------------------*/
const router = require("express").Router();
/*-------------------------------------------------------*/
// Room Routes:

const Room = require("../controllers/room");

router.route("/").get(Room.list).post(Room.create);

router
  .route("/:roomId")
  .get(Room.read)
  .put(Room.update)
  .patch(Room.update)
  .delete(Room.delete);

module.exports = router;
