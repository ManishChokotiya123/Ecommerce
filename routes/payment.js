const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentcontroller");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/payment/process", isAuthenticatedUser, processPayment);

router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
