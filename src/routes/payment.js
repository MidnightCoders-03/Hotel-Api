"use strict"

const router = require("express").Router()

const payment = require("../controllers/payment")

router.post('/create', payment.paymentInfo);
router.post('/confirm', payment.confirmPayment);

module.exports = router;