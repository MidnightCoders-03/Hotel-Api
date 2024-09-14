"use strict"

const {
    mongoose: { Schema, model },
  } = require("../configs/dbConnection");

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['usd', 'eur', 'gbp', 'try', 'aud'], // Add currencies supported
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
    collection: "payments",
    timestamps: true
});

module.exports = model('Payment', PaymentSchema);
