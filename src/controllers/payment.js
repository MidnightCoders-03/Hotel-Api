"use strict";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");

module.exports = {
  paymentInfo: async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).send({
          error: true,
          message: "Amount and currency are required.",
        });
      }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    const payment = new Payment({
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
   const data = await payment.save();
  //  console.log("data in payment: ",data);
    res.status(200).send({
      error: false,
      clientSecret: paymentIntent.client_secret,
    });
  },
};
