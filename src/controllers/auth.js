"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const jwt = require('jsonwebtoken');

const {
  encryptFunc,
  passwordEncrypt,
} = require("../helpers/validationHelpers");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    username: "testF0",
                    password: "aA?123456"
                }
            }
        */

    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      res.errorStatusCode = 400;
      throw new Error("Username,email and password must be entered");
    }

    const user = await User.findOne({ $and: [{ username }, { email }], password });

    if (!user) {
      res.errorStatusCode = 401;
      throw new Error(
        "Credentials are wrong please check your username,email and password"
      );
    }

    if (user && user.password == passwordEncrypt(password) && user.isActive) {
      // console.log("user password checked");
      let tokenData = await Token.findOne({ userId: user.id });
      // console.log("tokenData: ",tokenData);
      if (!tokenData) {
        const tokenKey = encryptFunc(Date.now() + user._id);
        // console.log("tokenKey: ",tokenKey);
        tokenData = await Token.create({ userId: user._id, token: tokenKey });
        // console.log("tokenData",tokenData);
      }

     const accessData = {
        key: process.env.ACCESS_KEY,
        time: process.env.ACCESS_EXP || "10m",
        data: {
            _id:user._id,
            username:user.username,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            isStaff: user.isStaff,
        }
     }

     const refreshData = {
        key: process.env.REFRESH_KEY,
        time: process.env.REFRESH_EXP || '10m',
        data: {
            id: user._id,
            password: user.password
        }
     }

     const accessToken = jwt.sign(
        accessData.data,
        accessData.key,{ expiresIn: accessData.time})

        const refreshToken = jwt.sign(refreshData.data, refreshData.key, { expiresIn: refreshData.time})

       res.status(200).send({
      error: false,
      token: tokenData.token,
      bearer: {
        access: accessToken,
        refresh: refreshToken
      },
      user,
    });
    }

   
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "JWT: Refresh"
            #swagger.description = 'Refresh token.'
        */
       const refreshToken = req.body?.bearer?.refresh
      
       if(!refreshToken){
        res.errorStatusCode = 401
        throw new Error('You must provide the refresh token')

       }

       if(refreshToken) {
        const refreshData = await jwt.verify(refreshToken, process.env.REFRESH_KEY)
         
        if(!refreshData){
            res.errorStatusCode = 401
            throw new Error('JWT refresh data is wrong')
        }
        if(refreshData){
            const user = await User.findOne({ _id: refreshData.id})
           if(!user){
            res.errorStatusCode = 401
            throw new Error('username/email or password is INVALID!')
           }
           res.status(200).send({
            error: false,
            bearer: {
                access: jwt.sign(user.toJSON(),process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXP || "10m"})
            }
           })
        }
       }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "SimpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    const token = req.headers?.authorization.split(" ")[1];

    const { deletedCount } = await Token.deleteOne({ token });
    res.status(deletedCount ? 204 : 404).send({
      error: !!!deletedCount,
      message: deletedCount
        ? "Logged out successfully"
        : "Something went wrong",
    });
  },
};
