const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  createOrder,
  payOrder,
  paymentResponse,
} = require("../controllers/paymentcontroller");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentSchema:
 *       type: object
 *       properties:
 *         amount:
 *           type: string
 *           description: Enter the email and check the email in database .
 *
 *       required:
 *         - amount
 */
/**
 * @swagger
 * /payment/process:
 *   post:
 *     summary: Create a payment Api.
 *     tags:
 *       - Payment
 *     security:
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentSchema'
 *     responses:
 *       201:
 *         description: payment successfully.
 */
router.post("/payment/process", isAuthenticatedUser, processPayment);
/**
 * @swagger
 * /stripeapikey:
 *  get:
 *    tags:
 *       - Payment
 *    security:
 *        - Authorization: []
 *
 *    description: Get all the fetch Stripe Api key from DB
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Users fetched successfully.
 */
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

router.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", createOrder);
router.post("/pay-order", payOrder);
router.get("/pay-res", paymentResponse);

module.exports = router;
