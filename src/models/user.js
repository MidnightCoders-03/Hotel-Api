"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");
// User Model:

const {
  passwordEncrypt,
  emailValidate,
} = require("../helpers/validationHelpers");

// User Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: true,
      set: (email) => emailValidate(email),
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },

    maidenName: {
      type: String,
      trim: true,
    },

    age: Number,
    gender: String,
    birthDate: Date,
    phoneNumber: String,

    address: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
    },

    image: {
      type: String,
      trim: true,
    }, 

    bank: {
      cardExpire: {
        type: String,
        trim: true,
        // required: true,
      },

      cardNumber: {
        type: String,
        trim: true,
        // required: true,
        // unique: process.env.NODE_ENV === 'production',
      },

      cardType: String,
      currency: {
        type: String,
        enum: ["usd", "eur", "gbp", "try", "aud"], 
        // required: true,
      },

      IBAN: {
        type: String,
        trim: true,
        // required: true,
        // unique: process.env.NODE_ENV === 'production',
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
