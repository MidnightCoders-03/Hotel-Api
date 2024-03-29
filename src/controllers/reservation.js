"use strict"

const Reservation = require("../models/reservation")

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
      const data = await Reservation.create(req.body)

      rs.status(201).send({
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