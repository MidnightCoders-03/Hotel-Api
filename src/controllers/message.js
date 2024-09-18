"use strict";

const Message = require("../models/message");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "List Messages"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    const data = await Message.find().populate("userId");

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Create Message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Message 1"
                }
            }
        */

    const data = await Message.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Get Single Message"
        */

    const data = await Message.findOne({
      _id: req.params.messageId,
    });

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Update Message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Message 1"
                }
            }
        */

    await Message.updateOne({ _id: req.params.messageId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data: await Message.findOne({
        _id: req.params.messageId,
      }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Delete Message"
        */

    await Message.deleteOne({ _id: req.params.messageId });

    res.status(200).send({
      error: false,
      message: "Requested Message deleted successfully",
    });
  },
  count: async (req, res) => {
    const data = await Message.countDocuments();
    res.status(200).send({
      error: false,
      data,
    });
  },
  unReadList: async (req, res) => {
    const data = await Message.countDocuments({ isRead: false });
    res.status(200).send({
      error: false,
      data,
    });
  },
  unReadPost: async (req, res) => {
    const { messageIds } = req.body;
    // console.log(messageIds);
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { isRead: true } }
    );
    const data = await Message.countDocuments({ isRead: false });
    res.status(200).send({
      error: false,
      data,
    });
  },
  recent: async (req, res) => {
    const data = await Message.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).send({
      error: false,
      data,
    });
  },
};