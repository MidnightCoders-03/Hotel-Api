"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS |  MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */


const { mongoose: { Schema, model }} = require("../configs/dbConnection")/* ------------------------------------------------------- */

// Room Schema
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      enum: {
        values: ["A1", "A2", "A3", "A4","A5","A6","A7"],
        message: "Please select correct room number",
      },
      trim: true,
      required: [true, "Room number is required"],
      unique: true,
    },
    bedType: {
      type: String,
      trim: true,
      required: [true, "Room type is required"],
      enum: {
        values: ["single", "double", "family", "king"],
        message: "Please select correct room type",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: [], // URL TO IMAGE, MULTER UPLOAD
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

// Room Model:
module.exports = model("Room", RoomSchema);
 