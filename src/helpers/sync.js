"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sync():

module.exports = async function() {

    // return null;

    /* CLEAR DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* CLEAR DATABASE */
    const User = require("../models/user");

  await User.create([
    {
      _id: "65343222b67e9681f937f511",
      username: "admin",
      password: "aA?123456",
      email: "admin@site.com",
      firstName: "admin",
      lastName: "admin",
      isActive: true,
      isDeleted: false,
      isStaff: false,
      isAdmin: true,
    },
    {
      _id: "65343222b67e9681f937f512",
      username: "staff1",
      password: "aA?123456",
      email: "staff1@site.com",
      firstName: "Staff1",
      lastName: "Staffz",
      isActive: true,
      isDeleted: false,
      isStaff: true,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f513",
      username: "staff2",
      password: "aA?123456",
      email: "staff2@site.com",
      firstName: "Staff2",
      lastName: "Staffz",
      isActive: true,
      isDeleted: false,
      isStaff: true,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f514",
      username: "Ali",
      password: "aA?123456",
      email: "ali@site.com",
      firstName: "Ali",
      lastName: "Aliz",
      isActive: true,
      isDeleted: false,
      isStaff: true,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f515",
      username: "Veli",
      password: "aA?123456",
      email: "veli@site.com",
      firstName: "Veli",
      lastName: "Veliz",
      isActive: true,
      isDeleted: false,
      isStaff: false,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f516",
      username: "Aydan",
      password: "aA?123456",
      email: "aydan@site.com",
      firstName: "Aydan",
      lastName: "Aydanz",
      isActive: true,
      isDeleted: false,
      isStaff: false,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f517",
      username: "Canan",
      password: "aA?123456",
      email: "canan@site.com",
      firstName: "Canan",
      lastName: "Cananz",
      isActive: true,
      isDeleted: false,
      isStaff: false,
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f518",
      username: "Emel",
      password: "aA?123456",
      email: "emel@site.com",
      firstName: "Emel",
      lastName: "Emelz",
      isActive: true,
      isDeleted: false,
      isStaff: false,
      isAdmin: false,
    },
  ]);
  console.log("---Users added---");
}