"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS |  MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection"); /* ------------------------------------------------------- */

// Room Schema
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      enum: {
        values: ["A1", "A2", "A3", "A4", "A5", "A6", "A7"],
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

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    image: [],

    ratings: [{
      value: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }],

    averageRating: {
      type: Number,
      default: 0  
    }
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

RoomSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
  return sum / this.ratings.length;
};


RoomSchema.pre('save', function(next) {
  this.averageRating = this.calculateAverageRating();
  next();
});

// Room Model:
module.exports = model("Room", RoomSchema);