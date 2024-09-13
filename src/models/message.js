"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const MessageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    }
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = model("Message", MessageSchema);