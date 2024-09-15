"use strict"

const router = require("express").Router()

const payment = require("../controllers/payment")

router.post('/create', payment.paymentInfo);

module.exports = router;