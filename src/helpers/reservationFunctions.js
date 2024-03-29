"use strict"

const nightCalc=(arrival_date,departure_date)=>{
    const arrival = new Date(arrival_date) //! arrival_date in milliseconds
    const departure = new Date(departure_date) //! departure_date in milliseconds
    const difference = departure - arrival
  
    const millisecondsPerDay = 1000 * 60 * 60 * 24 //! milliseconds in a day
    const night = Math.floor ( difference / millisecondsPerDay) //! calculate the night as a day
     
    return night
  
  }