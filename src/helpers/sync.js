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

  const Room = require("../models/room")

  await Room.create([
    {
      "_id": '66d4cc23d6e709facfb5b3df',
      "roomNumber": "A1",
      "bedType": "single",
      "description": "A cozy single room with modern amenities.",
      "price": 50,
      "image": [
        "https://cdn.pixabay.com/photo/2016/04/15/11/46/bedroom-1330846_640.jpg"
      ],
      "ratings": [
        {
          "value": 4,
          "userId": "65343222b67e9681f937f515"
        },
        {
          "value": 5,
          "userId": "65343222b67e9681f937f516"
        }
      ],
      "averageRating": 4.5
    },
    {
      "_id": '66d4cc8dd6e709facfb5b3e3',
      "roomNumber": "A2",
      "bedType": "double",
      "description": "A spacious double room with a beautiful city view.",
      "price": 75,
      "image": [
        "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_640.jpg"
      ],
      "ratings": [
        {
          "value": 3,
          "userId": "65343222b67e9681f937f517"
        }
      ],
      "averageRating": 3
    },
    {
      "_id": '66d4cc94d6e709facfb5b3e7',
      "roomNumber": "A3",
      "bedType": "family",
      "description": "A family room perfect for a comfortable stay.",
      "price": 100,
      "image": [
        "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_640.jpg"
      ],
      "ratings": [
        {
          "value": 5,
          "userId": "65343222b67e9681f937f518"
        },
        {
          "value": 4,
          "userId": "65343222b67e9681f937f517"
        },
        {
          "value": 5,
          "userId": "65343222b67e9681f937f516"
        }
      ],
      "averageRating": 4.67
    },
    {
      "_id": '66d4ccaed6e709facfb5b3eb',
      "roomNumber": "A4",
      "bedType": "king",
      "description": "A luxurious king-sized room with premium facilities.",
      "price": 150,
      "image": [
        "https://cdn.pixabay.com/photo/2015/01/16/08/54/motel-601218_640.jpg"
      ],
      "ratings": [
        {
          "value": 5,
          "userId": "65343222b67e9681f937f515"
        }
      ],
      "averageRating": 5
    },
    {
      "_id": '66d4ccb9d6e709facfb5b3ef',
      "roomNumber": "A5",
      "bedType": "single",
      "description": "An elegant single room with a cozy atmosphere.",
      "price": 55,
      "image": [
        "https://cdn.pixabay.com/photo/2017/04/28/22/16/room-2269594_640.jpg"
      ],
      "ratings": [
        {
          "value": 4,
          "userId": "65343222b67e9681f937f514"
        },
        {
          "value": 4,
          "userId": "65343222b67e9681f937f513"
        }
      ],
      "averageRating": 4
    },
    {
      "_id": '66d4cce9d6e709facfb5b3f3',
      "roomNumber": "A6",
      "bedType": "double",
      "description": "A comfortable double room with modern facilities.",
      "price": 80,
      "image": [
        "https://cdn.pixabay.com/photo/2021/12/18/06/13/hotel-6878054_640.jpg"
      ],
      "ratings": [
        {
          "value": 3,
          "userId": "65343222b67e9681f937f513"
        },
        {
          "value": 4,
          "userId": "65343222b67e9681f937f512"
        }
      ],
      "averageRating": 3.5
    },
    {
      "_id": '66d4cceed6e709facfb5b3f7',
      "roomNumber": "A7",
      "bedType": "family",
      "description": "A spacious family room with a beautiful garden view.",
      "price": 110,
      "image": [
        "https://cdn.pixabay.com/photo/2016/06/10/01/05/hotel-room-1447201_640.jpg"
      ],
      "ratings": [
        {
          "value": 4,
          "userId": "65343222b67e9681f937f514"
        },
        {
          "value": 5,
          "userId": "65343222b67e9681f937f515"
        }
      ],
      "averageRating": 4.5
    }
  ])
  console.log("---Rooms added---");
}