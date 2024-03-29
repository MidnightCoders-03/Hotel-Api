"use strict";


const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");


const ReservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    arrival_date: {
      type: Date,
      required: [true,"Please enter your arrival_date in YEAR-MONTH-DAY format"]
    },

    departure_date: {
      type: Date,
      required: [true,"Please enter your departure_date in YEAR-MONTH-DAY format"]
    },

    guest_number: {
      type: Number,
      default: 1
    },

    night: {
      type: Number,
      // required: true,
      // set: function (){
      //     return Number(this.departure_date.split("-")[2]) - Number(this.arrival_date.split("-")[2])
      // }  //! if user makes a reservation in a month
    set: function(){
        const arrival = new Date(this.arrival_date) //! arrival_date in milliseconds
        const departure = new Date(this.departure_date) //! departure_date in milliseconds
        const difference = departure - arrival

        const millisecondsPerDay = 1000 * 60 * 60 * 24 //! milliseconds in a day
        const night = Math.floor ( difference / millisecondsPerDay) //! calculate the night as a day
         
        return night

    }
    },

    price: {
      type: Number,
      // required: true,
      // enum: [100, 150, 200, 300],
    },

    totalprice: {
      type: Number,
      // required: true,
    //   set: function(){
    //     if(this.guest_number == 1){
    //           return this.totalprice = this.price.enum[0]
    //     }else if(this.guest_number == 2){
    //           return this.totalprice = this.price.enum[1] 
    //     }else if(this.guest_number == 4){
    //         return this.totalprice = this.price.enum[2]
    //     }else if(this.guest_number > 4 ){
    //         return this.totalprice = this.price.enum[3]
    //     }else {
    //         throw new Error("Please enter a valid number")
    //     }
    // }
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

module.exports = model("Reservation", ReservationSchema) 
