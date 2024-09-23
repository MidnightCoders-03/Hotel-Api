"use strict";
/*-------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
-------------------------------------------------------*/
// Room Controller:

const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    // const data = await Room.find();
    const data = await res.getModelList(Room);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Room),
      data,
    });
  },

  create: async (req, res) => {
    const userId = req?.user?.id;
    const roomId = req?.body?.roomId;
    const room = await Room.findOne({ _id: roomId });

    const data = await Room.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },

  read: async (req, res) => {
    const data = await Room.findOne({ _id: req.params.roomId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    console.log("update rooms: ", req.body.ratings);
    console.log("value in:", req.body.ratings.value);
    if (req.body.ratings) {
      const { ratings } = req.body;
      const room = await Room.findOne({ _id: req.params.roomId });
      if (!room) throw new Error("Room not found");
      room.ratings.push({
        value: ratings.value,
        userId: ratings.userId,
      });
      room.averageRating = room.calculateAverageRating();
      const data = await room.save();
      res.status(202).send({
        error: false,
        data,
      });
    } else {
      await Room.updateOne({ _id: req.params.roomId }, req.body);

      const data = await Room.findOne({ _id: req.params.roomId });
      console.log("updated data: ", data);
      res.status(202).send({
        error: false,
        data,
      });
    }
  },

  delete: async (req, res) => {
    const data = await Room.deleteOne({ _id: req.params.roomId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
