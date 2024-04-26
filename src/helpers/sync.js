"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sync():

module.exports = async function() {

    return null;

    /* CLEAR DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* CLEAR DATABASE */

}

// ROOM DATA:
/* ------------------------------------------------------- *
{
    "error": false,
    "details": {
      "skip": 0,
      "limit": 25,
      "page": 0,
      "pages": false,
      "totalRecords": 7
    },
    "data": [
      {
        "_id": "66070c59b196fbab96421634",
        "roomNumber": "A1",
        "bedType": "single",
        "price": 100,
        "image": [
          "https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg",
          "https://hotelsamos2019.webs3.mirai.es/wp-content/uploads/sites/1957/nggallery/headers-rooms/room-10931.jpg"
        ],
        "createdAt": "2024-03-29T18:45:45.714Z",
        "updatedAt": "2024-04-26T21:29:14.639Z",
        "__v": 0
      },
      {
        "_id": "66070c72b196fbab96421636",
        "roomNumber": "A2",
        "bedType": "single",
        "price": 100,
        "image": [
          "https://www.londonhousehotels.com/wp-content/uploads/2017/11/2.-1-Single-Room-MAIN.jpg"
        ],
        "createdAt": "2024-03-29T18:46:10.013Z",
        "updatedAt": "2024-04-26T21:30:11.840Z",
        "__v": 0
      },
      {
        "_id": "66070c86b196fbab96421638",
        "roomNumber": "A3",
        "bedType": "double",
        "price": 150,
        "image": [
          "https://www.goldennugget.com/globalassets/atlantic-city/hotel/hotel-doublebeds-web-550x306.jpg"
        ],
        "createdAt": "2024-03-29T18:46:30.457Z",
        "updatedAt": "2024-04-26T21:33:16.343Z",
        "__v": 0
      },
      {
        "_id": "66070c92b196fbab9642163a",
        "roomNumber": "A4",
        "bedType": "double",
        "price": 150,
        "image": [
          "https://www.redrockresort.com/wp-content/uploads/2020/12/RR-Standard-2-Queen.jpg"
        ],
        "createdAt": "2024-03-29T18:46:42.971Z",
        "updatedAt": "2024-04-26T21:33:49.176Z",
        "__v": 0
      },
      {
        "_id": "66070ca0b196fbab9642163c",
        "roomNumber": "A5",
        "bedType": "family",
        "price": 200,
        "image": [
          "https://ideaholiday.gr/images/2017/09/19/20170610_121028.jpg",
          "https://images.mirai.com/INFOROOMS/100375514/XqCXo2RvCYh1w1IcaWu0/XqCXo2RvCYh1w1IcaWu0_large.jpg"
        ],
        "createdAt": "2024-03-29T18:46:56.407Z",
        "updatedAt": "2024-04-26T21:34:24.482Z",
        "__v": 0
      },
      {
        "_id": "66070ca4b196fbab9642163e",
        "roomNumber": "A6",
        "bedType": "family",
        "price": 200,
        "image": [
          "https://visotsky-hotel.ru/en/assets/photo/vip-rooms-photo/room-5101/hotel-visotsky-vip-rooms-5101-01.jpg"
        ],
        "createdAt": "2024-03-29T18:47:00.522Z",
        "updatedAt": "2024-04-26T21:34:55.551Z",
        "__v": 0
      },
      {
        "_id": "66070cafb196fbab96421640",
        "roomNumber": "A7",
        "bedType": "king",
        "price": 300,
        "image": [
          "https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,g=auto,fit=scale-down/ki-cms-prod/images/0/5/4/0/200450-1-eng-GB/135bf3e57da3-73662435_4K.jpg"
        ],
        "createdAt": "2024-03-29T18:47:11.275Z",
        "updatedAt": "2024-04-26T21:35:38.499Z",
        "__v": 0
      }
    ]
  }

/* ------------------------------------------------------- */