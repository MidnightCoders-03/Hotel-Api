"use strict"

//* Encrypt 
const { pbkdf2Sync } = require("node:crypto"),

 keyCode = process.env.SECRET_KEY,
 loopCount = 10_000,
 charCount = 32,
 encType = "sha512";

const encryptFunc = (password) => {
    return pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString("hex")
}

//* password conditions and Encrypt
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/

const passwordEncrypt = (password) => {
    if(passwordRegex.test(password)){
      return  encryptFunc(password)
    } else {
        throw new Error("Please provide the credentials for your password")
    }
}


//* Checking Email conditions 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const emailValidate = (email) => {
    if(emailRegex.test(email)) {
        return email
    }
    throw new Error("Please check your email")
}

module.exports = {
    passwordEncrypt, emailValidate, encryptFunc
}