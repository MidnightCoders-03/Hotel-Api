"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */

const { mongoose: { Schema, model }} = require("../configs/dbConnection")
// User Model:

const { passwordEncrypt, emailValidate } = require("../helpers/validationHelpers");


// User Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true
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
      set: (email) => emailValidate(email)
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password)
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff:{
      type:Boolean,
      default:false
    },

    maidenName: String,
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
    profilePhoto: String, // URL TO IMAGE, MULTER UPLOAD
    bank: {                 
      cardExpire: String,
      cardNumber: String,
      cardType: String,
      currency: String,
      iban: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
