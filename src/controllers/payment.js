"use strict";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");
const Reservation = require("../models/reservation");

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
      userId: req?.user?._id,
      paymentIntentId: paymentIntent.id,
      // status: paymentIntent.status,
      status: true,
    });
    const data = await payment.save();
    console.log("data in payment: ", data);
    res.status(200).send({
      error: false,
      clientSecret: paymentIntent.client_secret,
    });
  },
  confirmPayment: async (req, res) => {
    const { userId, reservationId } = req.body;

    const reservation = await Reservation.findOne({
      _id: reservationId,
      userId,
    });

    if (!reservation) {
      return res
        .status(404)
        .send({ error: true, message: "Reservation not found" });
    }

    // Mark payment as successful
    await Reservation.updateOne(
      { _id: reservation._id },
      { status: "payment successful" }
    );

    res
      .status(200)
      .send({
        error: false,
        message: "Payment confirmed, reservation successful",
      });
  },
};