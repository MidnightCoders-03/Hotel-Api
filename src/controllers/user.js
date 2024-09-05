"use strict";

const { encryptFunc } = require("../helpers/validationHelpers");
const User = require("../models/user");
const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const auth = req.headers?.authorization || null;
    const token = auth ? auth.split(" ")[1] : null;
    if (!token) {
      throw new Error("Please log in first");
    }
    const customFilters =
      req.user?.isAdmin || req.user?.isStaff ? {} : { isDeleted: false };
    const data = await User.find(customFilters);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

    req.body.isAdmin = false; //* if user sends isAdmin = true it would be accepted as false
    req.body.isStaff = false; //* if user sends isStaff = true it would be accepted as false
    const data = await User.create(req.body);

    // //! AUTO LOGIN:

    // const tokenData = await Token.create({
    //     userId: data._id,
    //     token: encryptFunc(data._id + Date.now())
    // })

    res.status(201).send({
      error: false,
      // token: tokenData.token,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

    const customFilters =
      req.user?.isAdmin || req.user?.isStaff
        ? { _id: req.params.userId }
        : { _id: req.user._id }; //! if the user is not Admin only his/her own record he/she could see

    const data = await User.findOne({ ...customFilters, isDeleted: false });

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // console.log("Admin status",req.user.isAdmin);
    // console.log("Staff status",req.user.isStaff);
    // console.log("Active status",req.user.isActive);

    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

    if (!req.user?.isAdmin) {
      //! if the user is not Admin, he/she cannot change isActive, isStaff and isAdmin status
      delete req.body.isActive;
      delete req.body.isAdmin;
      delete req.body.isStaff;
    }
    const customFilter = !(req.user?.isAdmin || req.user?.isStaff)
      ? { _id: req.user?._id }
      : { _id: req.params.userId };
    const data = await User.updateOne(
      { ...customFilter, isDeleted: false },
      req.body,
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
      updatedData: await User.findOne({ ...customFilter }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    // const data = await User.deleteOne({ _id: req.params.userId})
    const data = await User.updateOne(
      { _id: req.params.userId },
      { isDeleted: true, isActive: false }
    );
    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      data,
    });
  },
};
