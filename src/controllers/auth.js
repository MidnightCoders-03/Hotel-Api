"use strict"

const User = require("../models/user")
const Token = require("../models/token")

const { encryptFunc } = require("../helpers/validationHelpers")

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
                    password: "1234"
                }
            }
        */

      
        const { username, email, password } = req.body

        if(!(username && email && password)) {
            res.errorStatusCode = 400
            throw new Error("Username/email and password must be entered")
        }

        const user = await User.findOne({ $and: [{ username }, { email }], password })

        if(!user){
            res.errorStatusCode = 401
            throw new Error("Credentials are wrong please check your username/email and password")
        }

        if(!user.isActive){
            res.errorStatusCode = 403
            throw new Error("Sorry, you are unauthorized to log in ")
        }

        if(user.isDeleted){
            res.errorStatusCode = 403
            throw new Error("Sorry, there is no user with the provided credentials ")
        }

        let tokenData = await Token.findOne( { userId: user._id })

        if(!tokenData) {
            const tokenKey = encryptFunc(Date.now() + user._id)
            tokenData = await Token.create({ userId: user._id, token: tokenKey })
        }

        res.status(200).send({
            error: false,
            token: tokenData.token,
            user
        })
    },



    logout: async (req, res) => {

            /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "SimpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

         const token = req.headers?.authorization.split(" ")[1]

         const { deletedCount } = await Token.deleteOne({ token })
         res.status(deletedCount ? 204 : 404 ).send({
            error: !(!!deletedCount),
            message: deletedCount ? "Logged out successfully" : "Something went wrong"
         })
    }
}