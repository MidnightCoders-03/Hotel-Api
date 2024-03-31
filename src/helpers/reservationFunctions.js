"use strict"

const Room = require("../models/room")

const nightCalc=(arrival_date,departure_date)=>{
    const arrival = new Date(arrival_date) //! arrival_date in milliseconds
    const departure = new Date(departure_date) //! departure_date in milliseconds
    const difference = departure - arrival
  
    const millisecondsPerDay = 1000 * 60 * 60 * 24 //! milliseconds in a day
    const night = Math.floor ( difference / millisecondsPerDay) //! calculate the night as a day
     
    return night
  
  }

  const roomGuestNumber = async (number) => {
    let room
        switch (true) {
          case number === 1:
            room = await Room.find({ bedType: "single" });
            break;

          case number === 2:
            room = await Room.find({ bedType: "double" });
            break;

          case number >= 3 && number < 6:
            room = await Room.find({ bedType: "family" });
            break;
            
          case number >= 6:
            room = await Room.find({ bedType: "king" });
            break;
        
          default:
            throw new Error("Enter a valid guest number")
            
        }
  }