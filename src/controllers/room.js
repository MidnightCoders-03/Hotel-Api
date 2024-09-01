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
      details:await res.getModelListDetails(Room),
      data,
    });
  },


  create: async (req, res) => {
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
    const data = await Room.updateOne({ _id: req.params.roomId }, req.body);
    const updatedData = await Room.findOne({ _id: req.params.roomId });
    res.status(202).send({
      error: false,
      data,
      updatedData,
    });
  },


  delete: async (req, res) => {
    const data = await Room.deleteOne({ _id: req.params.roomId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

};
