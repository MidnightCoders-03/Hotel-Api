"use strict";

const Reservation = require("../models/reservation");
const User = require("../models/user");
const Room = require("../models/room");

const nightCalc = (arrival_date, departure_date) => {
  const arrival = new Date(arrival_date); //! arrival_date in milliseconds
  const departure = new Date(departure_date); //! departure_date in milliseconds
  const difference = departure - arrival;

  const millisecondsPerDay = 1000 * 60 * 60 * 24; //! milliseconds in a day
  const night = Math.floor(difference / millisecondsPerDay); //! calculate the night as a day

  return night;
};

module.exports = {
  list: async (req, res) => {
    // console.log(req.user);
    // const customFilter = (!req.user?.isAdmin || !req.user?.isStaff) ?
    //    { userId: req.user?.id } : {}

    const data = await res.getModelList(Reservation, {}, ["userId", "roomId"]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {

    let { username, guest_number, departure_date, arrival_date, roomNumber } = req.body;

    const arrival = new Date(arrival_date).getTime();
    const departure = new Date(departure_date).getTime();
    const currentDate = Date.now();
    const notPassed = currentDate > arrival || currentDate > departure;
    const invalidDate = arrival > departure;
    
    if (notPassed || invalidDate) {
      res.errorStatusCode = 400;
      throw new Error("Please enter valid dates");
    }
    
    // Find the user making the reservation
    const user = await User.findOne({ username });
    if (!user) {
      res.errorStatusCode = 404;
      throw new Error("User not found");
    }
    const userId = user._id;
    const roomInfo = await Room.findOne({ roomNumber })
    console.log("roomInfo: ",roomInfo);
 
    
    // Check if the user has already booked this room for overlapping dates
    const existingUserReservation = await Reservation.findOne({
      userId: userId,
      roomId: roomInfo._id,
      $or: [
        { arrival_date: { $lte: req.body.departure_date }, departure_date: { $gte: req.body.arrival_date } }
      ]
    });
    
    if (existingUserReservation) {
      throw new Error("You have already reserved this room for the requested period");
    }
    
    // Check if another user has already booked this room for overlapping dates
    const existingReservation = await Reservation.findOne({
      roomId: roomInfo._id,
      $or: [
        { arrival_date: { $lte: req.body.departure_date }, departure_date: { $gte: req.body.arrival_date } }
      ]
    });
    
    if (existingReservation) {
      throw new Error("This room is already reserved for the requested period");
    }
    
    // If the room is available, proceed with reservation
    req.body.userId = userId;
    req.body.roomId = roomInfo._id;
    req.body.night = nightCalc(arrival_date, departure_date);
    req.body.totalPrice = req.body.night * req.body.price;
    
    // Create a reservation
    const data = await Reservation.create(req.body);
    
    res.status(201).send({
      error: false,
      data,
    });
    
  },

  read: async (req, res) => {
    let customFilter = {};
    if (!req.user.isAdmin) {
      customFilter = { userId: req.user.id };
    }

    const data = await Reservation.findOne({
      _id: req.params.id,
      ...customFilter,
    }).populate(["userId", "roomId"]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      updatedData: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};

