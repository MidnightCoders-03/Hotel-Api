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
  // await User.create([
  //   {
  //     _id: "65343222b67e9681f937f519",
  //     username: "Ali",
  //     password: "aA?123456",
  //     email: "ali@site.com",
  //     firstName: "Ali",
  //     lastName: "Aliz",
  //     maidenName: "Alioglu",
  //     age: 32,
  //     gender: "male",
  //     birthDate: "1992-06-15",
  //     phoneNumber: "+905551234567",
  //     address: {
  //       address: "123 Main St",
  //       city: "Istanbul",
  //       state: "Istanbul",
  //       postalCode: "34000",
  //     },
  //     image: "https://example.com/images/ali.jpg",
  //     bank: {
  //       cardExpire: "12/25",
  //       cardNumber: "1234-5678-1234-5678",
  //       cardType: "visa",
  //       currency: "usd",
  //       IBAN: "TR33 1234 5678 9012 3456 7890 12",
  //     },
  //     isActive: true,
  //     isDeleted: false,
  //     isStaff: true,
  //     isAdmin: false,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f520",
  //     username: "Veli",
  //     password: "aA?123456",
  //     email: "veli@site.com",
  //     firstName: "Veli",
  //     lastName: "Veliz",
  //     maidenName: "Velikoglu",
  //     age: 28,
  //     gender: "male",
  //     birthDate: "1996-03-10",
  //     phoneNumber: "+905551234568",
  //     address: {
  //       address: "456 Elm St",
  //       city: "Ankara",
  //       state: "Ankara",
  //       postalCode: "06000",
  //     },
  //     image: "https://example.com/images/veli.jpg",
  //     bank: {
  //       cardExpire: "11/24",
  //       cardNumber: "9876-5432-1098-7654",
  //       cardType: "mastercard",
  //       currency: "eur",
  //       IBAN: "TR12 9876 5432 1098 7654 3210 09",
  //     },
  //     isActive: true,
  //     isDeleted: false,
  //     isStaff: false,
  //     isAdmin: false,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f521",
  //     username: "Zeynep",
  //     password: "Zz?987654",
  //     email: "zeynep@site.com",
  //     firstName: "Zeynep",
  //     lastName: "Zeynal",
  //     maidenName: "Zeynepoglu",
  //     age: 40,
  //     gender: "female",
  //     birthDate: "1984-09-25",
  //     phoneNumber: "+905551234569",
  //     address: {
  //       address: "789 Oak St",
  //       city: "Izmir",
  //       state: "Izmir",
  //       postalCode: "35000",
  //     },
  //     image: "https://example.com/images/zeynep.jpg",
  //     bank: {
  //       cardExpire: "10/23",
  //       cardNumber: "1111-2222-3333-4444",
  //       cardType: "amex",
  //       currency: "gbp",
  //       IBAN: "TR45 1111 2222 3333 4444 5555 66",
  //     },
  //     isActive: false,
  //     isDeleted: false,
  //     isStaff: true,
  //     isAdmin: true,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f522",
  //     username: "Mehmet",
  //     password: "Mm@4321qwe",
  //     email: "mehmet@site.com",
  //     firstName: "Mehmet",
  //     lastName: "Mehmetoglu",
  //     maidenName: "Mehmetoz",
  //     age: 35,
  //     gender: "male",
  //     birthDate: "1988-02-15",
  //     phoneNumber: "+905551234570",
  //     address: {
  //       address: "101 Maple St",
  //       city: "Bursa",
  //       state: "Bursa",
  //       postalCode: "16000",
  //     },
  //     image: "https://example.com/images/mehmet.jpg",
  //     bank: {
  //       cardExpire: "09/24",
  //       cardNumber: "5555-6666-7777-8888",
  //       cardType: "visa",
  //       currency: "usd",
  //       IBAN: "TR67 5555 6666 7777 8888 9999 00",
  //     },
  //     isActive: true,
  //     isDeleted: false,
  //     isStaff: false,
  //     isAdmin: false,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f523",
  //     username: "Elif",
  //     password: "Ee!abcdef",
  //     email: "elif@site.com",
  //     firstName: "Elif",
  //     lastName: "Elifoglu",
  //     maidenName: "Elifzade",
  //     age: 29,
  //     gender: "female",
  //     birthDate: "1995-05-20",
  //     phoneNumber: "+905551234571",
  //     address: {
  //       address: "234 Pine St",
  //       city: "Antalya",
  //       state: "Antalya",
  //       postalCode: "07000",
  //     },
  //     image: "https://example.com/images/elif.jpg",
  //     bank: {
  //       cardExpire: "08/23",
  //       cardNumber: "9999-0000-1111-2222",
  //       cardType: "visa",
  //       currency: "eur",
  //       IBAN: "TR89 9999 0000 1111 2222 3333 44",
  //     },
  //     isActive: true,
  //     isDeleted: true,
  //     isStaff: false,
  //     isAdmin: false,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f524",
  //     username: "Murat",
  //     password: "Mm@123456",
  //     email: "murat@site.com",
  //     firstName: "Murat",
  //     lastName: "Muratoglu",
  //     maidenName: "Muratzade",
  //     age: 38,
  //     gender: "male",
  //     birthDate: "1986-11-05",
  //     phoneNumber: "+905551234572",
  //     address: {
  //       address: "567 Cedar St",
  //       city: "Adana",
  //       state: "Adana",
  //       postalCode: "01000",
  //     },
  //     image: "https://example.com/images/murat.jpg",
  //     bank: {
  //       cardExpire: "07/26",
  //       cardNumber: "3333-4444-5555-6666",
  //       cardType: "mastercard",
  //       currency: "gbp",
  //       IBAN: "TR01 3333 4444 5555 6666 7777 88",
  //     },
  //     isActive: false,
  //     isDeleted: false,
  //     isStaff: true,
  //     isAdmin: false,
  //   },
  //   {
  //     _id: "65343222b67e9681f937f525",
  //     username: "Cem",
  //     password: "Cc!qwerty",
  //     email: "cem@site.com",
  //     firstName: "Cem",
  //     lastName: "Cemoglu",
  //     maidenName: "Cemzade",
  //     age: 27,
  //     gender: "male",
  //     birthDate: "1997-01-30",
  //     phoneNumber: "+905551234573",
  //     address: {
  //       address: "890 Birch St",
  //       city: "Gaziantep",
  //       state: "Gaziantep",
  //       postalCode: "27000",
  //     },
  //     image: "https://example.com/images/cem.jpg",
  //     bank: {
  //       cardExpire: "06/25",
  //       cardNumber: "7777-8888-9999-0000",
  //       cardType: "visa",
  //       currency: "usd",
  //       IBAN: "TR23 7777 8888 9999 0000 1111 22",
  //     },
  //     isActive: true,
  //     isDeleted: false,
  //     isStaff: false,
  //     isAdmin: true,
  //   }
  // ])
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

  const Message = require("../models/message")
  await Message.create([
    {
      _id: "66df6735f68fa0d077febe66",
      content:
        "The room was spotless and had a fantastic view of the city skyline. Loved the modern decor and comfortable bed. Will definitely stay again!",
        userId:"65343222b67e9681f937f518",
        isRead: false
    },
    {
      _id: "66df6735f68fa0d077febe67",
      content:
        "A bit smaller than expected, but the room was cozy and clean. The bathroom amenities were top-notch, and the staff was super friendly.",
        userId:"65343222b67e9681f937f517",
        isRead: false
    },
    {
      _id: "66df6735f68fa0d077febe68",
      content:
        "I had a pleasant stay, though the room could use better soundproofing. Overall, the location was excellent and the service was quick.",
        userId:"65343222b67e9681f937f516",
        isRead: false
    },
    {
      _id: "66df6735f68fa0d077febe69",
      content:
        "The room was spacious and well-equipped, but the air conditioning was too loud at night. Otherwise, everything was perfect.",
        userId:"65343222b67e9681f937f515",
        isRead: false
    },
  ]);
  console.log("---Messages added---");
}