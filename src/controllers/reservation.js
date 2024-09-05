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
console.log(req.user);
    let customFilter = {};
    if (!req.user.isAdmin || !req.user.isStaff) {
      customFilter = { userId: req.user.id };
    }

    const data = await res.getModelList(Reservation, customFilter, [
      "userId",
      "roomId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation, customFilter),
      data,
    });
  },

  create: async (req, res) => {
    let { username, guest_number, departure_date, arrival_date } = req.body;

// console.log("reservation: ",username);
// console.log("reservation: ",guest_number);
// console.log("reservation: ",departure_date);
// console.log("reservation: ",arrival_date);

    const currentDate = Date.now();
    const arrival = new Date(arrival_date).getTime(); //! arrival_date in milliseconds
    const departure = new Date(departure_date).getTime(); //! departure_date in
    const notPassed = currentDate > arrival || currentDate > departure;
    const invalidDate = arrival > departure;
// console.log(arrival, typeof arrival); 
// console.log(arrival == currentDate); 
// console.log(arrival < currentDate); 
    if (notPassed || invalidDate) {
      res.errorStatusCode = 400;
      throw new Error("Please enter valid dates");
    }

    const userId = (await User.findOne({ username }))._id;

    if (!userId) {
      res.errorStatusCode = 404;
      throw new Error("User name not found!");
    }

    let room;
    // finding room bedType and calculatin its price if it is not sent in  req body
    if (!req.body.bedType) {

      guest_number = guest_number ? guest_number : 1

      if (guest_number === 1) {
        room = await Room.find({ bedType: "single" });
        // console.log(room);
      } else if (guest_number === 2) {
        room = await Room.find({ bedType: "double" });
      } else if (guest_number >= 3 && guest_number < 6) {
        room = await Room.find({ bedType: "family" });
      } else if (guest_number >= 6) {
        room = await Room.find({ bedType: "king" });
      }

      if (!req.body.price) {
        req.body.price = (await Room.findOne({ _id: room[0]._id })).price;
      }

    } else {
      room = await Room.find({ bedType: req.body.bedType });
    }
    // find reserved rooms and stor if it is note them in array as a string

    // console.log("room: ", room);
    const reservedRooms = await Reservation.find({
      bedType: room.bedType,
      $nor: [
        { arrival_date: { $gt: req.body.departure_date } },
        { departure_date: { $lt: req.body.arrival_date } }
      ],
    }).distinct("roomId")
    
// console.log("reservedRooms: ",reservedRooms);

    let reservedRoomsArr = []
    for (let reservedRoom of reservedRooms) {
      reservedRoomsArr.push(reservedRoom.roomId)
    }
    // filter the rooms using not in function and giving the bedType option.
    const availableRooms = await Room.find({ '_id': { $nin: reservedRoomsArr }, "bedType": room[0].bedType })
    // console.log("available rooms:", availableRooms);
    // if it is not found throw an error
    if (availableRooms.length === 0) throw new Error("the room you are looking for is not empty at the period of time you requested")

    // Update req body 
    req.body.userId = userId;
    req.body.roomId = availableRooms[0]._id;
    req.body.night = nightCalc(arrival_date, departure_date);
    req.body.totalPrice = req.body.night * req.body.price;

    // create a reservation 
    const data = await Reservation.create(req.body);
// console.log("data in reservation: ", data);
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

// const hiredRoom = availableRooms.push(room[0]._id)

// console.log("hired room is =>",hiredRoom);


// const reservedRooms = await Reservation.find({
//   $or: [
//     { arrival_date: { $gte: arrival_date, $lte: departure_date } }, // Giriş tarihi bu tarih aralığında olanlar
//     { departure_date: { $gte: arrival_date, $lte: departure_date } }, // Çıkış tarihi bu tarih aralığında olanlar
//   ],
//   roomId: room[0].id,
// }).populate({ path: "roomId", select: "-_id roomNumber" });

// const allRooms = await Room.find();
// const availableRooms = allRooms.filter(
//   (room) => !reservedRooms.includes(room._id)
// );
// console.log(req.body.roomId);
// if(availableRoom){
//   throw new Error("The room is not available now, You must enter different time")
// }
// console.log(room[0].bedType);


//  const availableRooms =  await Reservation.find({
//   bedType:room.bedType,
//             $nor: [
//                 { startDate: { $gt: req.body.endDate } },
//                 { endDate: { $lt: req.body.startDate } }
//             ]
//  })