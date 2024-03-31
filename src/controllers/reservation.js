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
    let customFilter = {};
    if (!req.user.isAdmin && !req.user.isStaff) {
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
    const { username, guest_number, departure_date, arrival_date } = req.body;

    const currentDate = Date.now();
    const arrival = new Date(arrival_date); //! arrival_date in milliseconds
    const departure = new Date(departure_date); //! departure_date in
    const notPassed = currentDate > arrival || currentDate > departure;
    const invalidDate = arrival > departure;

    if (notPassed || invalidDate) {
      res.errorStatusCode = 400;
      throw new Error("Please enter valid dates");
    }

    const userId = (await User.findOne({ username }))._id;
    // console.log(userId);
    req.body.userId = userId;
    let room;
    if (!req.body.bedType) {
      if (guest_number === 1) {
        room = await Room.find({ bedType: "single" });
      } else if (guest_number === 2) {
        room = await Room.find({ bedType: "double" });
      } else if (guest_number >= 3 && guest_number < 6) {
        room = await Room.find({ bedType: "family" });
      } else if (guest_number >= 6) {
        room = await Room.find({ bedType: "king" });
      } else {
        res.errorStatusCode = 404;
        throw new Error("Enter a valid guest number");
      }
      if (!req.body.price) {
        req.body.price = (await Room.findOne({ _id: room[0]._id })).price;
      }

      // console.log(room[0]._id);
      req.body.roomId = room[0]._id;
    } else {
      room = await Room.find({ bedType: req.body.bedType });
      // console.log(clientQuery[0]._id);
    }

// console.log(room[0].bedType);


//  const availableRooms =  await Reservation.find({
//   bedType:room.bedType,
//             $nor: [
//                 { startDate: { $gt: req.body.endDate } },
//                 { endDate: { $lt: req.body.startDate } }
//             ]
//  })
 const roomStatus =  await Reservation.find({
  bedType:room.bedType,
            $nor: [
                { arrival_date: { $gt: req.body.departure_date } },
                { departure_date: { $lt: req.body.arrival_date } }
            ],
            
 })


//  console.log("****************",roomStatus);

// console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%",room);
console.log(room[0].roomNumber);

if(roomStatus.length !== 0){
  console.log("the room you are looking for is not empty at the period of time you requested");
}else {
console.log(roomStatus[0] = room[0].roomNumber);  

}

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

    req.body.night = nightCalc(arrival_date, departure_date);
    // console.log(night);
    req.body.totalPrice = req.body.night * req.body.price;

    // console.log(req.body);
    // const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      // data,
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
