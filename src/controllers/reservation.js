"use strict"

const Reservation = require("../models/reservation")
const User = require('../models/user')
const Room = require('../models/room')

module.exports = {
    list: async (req, res) => {
      let customFilter = {}
      if(!req.user.isAdmin){
        customFilter = { userId: req.user.id}
      }
    

      const data = await res.getModelList(Reservation, customFilter, ["userId","roomId"])
      
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Reservation, customFilter),
        data
      })
    },

    create: async (req, res) => {
      const {username, guest_number} = req.body

      const userId = (await User.findOne({username}))._id
      // console.log(userId);
      req.body.userId=userId
      let room;
      if(!req.body.bedType){
        if(guest_number === 1){
          room = await Room.find({bedType:"single"})
          
      }else  if(guest_number === 2){
        room = await Room.find({bedType:"double"})
       
      }
      else  if(guest_number>=3 && guest_number <6){
        room = await Room.find({bedType:"family"})
       
      }
      else  if(guest_number>=6){
        room = await Room.find({bedType:"king"})
      
      }else{
          res.errorStatusCode = 404
          throw new Error('Enter a valid guest number')
      }
      
      console.log(room[0]._id);
      }else{
        const clientQuery = await Room.find({bedType:req.body.bedType})
        console.log(clientQuery[0]._id);
      }
      
      // const data = await Reservation.create(req.body)


      res.status(201).send({
        error: false,
        data
      })
    },

    read: async (req, res) => {
      let customFilter = {}
      if(!req.user.isAdmin){
        customFilter = { userId: req.user.id }
      }

      const data = await Reservation.findOne({ _id: req.params.id, ...customFilter }).populate(["userId","roomId"])

      res.status(200).send({
        error: false,
        data
      })
    },

    update: async (req, res) => {
      const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

      res.status(202).send({
        error: false,
        data,
        updatedData: await Reservation.findOne({ _id: req.params.id })
      })
    },

    delete: async (req, res) => {
      const data = await Reservation.deleteOne({ _id: req.params.id })

      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data
      })
    },
}