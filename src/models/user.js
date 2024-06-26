"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MIDNIGHT CODERS HOTEL API
------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

/* ------------------------------------------------------- */

//? PASSWORD VALIDATOR FUNCTION
const validatePassword = function (pass) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return re.test(pass);
};

//? EMAIL VALIDATOR FUNCTION
const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
/* ------------------------------------------------------- */

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      validate: [
        validateEmail,
        "Please enter a valid email  *validateEmail function* ",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      set: (password) => {
        if (validatePassword(password)) {
          return passwordEncrypt(password);
        } else {
          throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and at least 8 characters in length"
          );
        }
      },
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

    firstName: String,
    lastName: String,
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

module.exports = mongoose.model("User", userSchema);
