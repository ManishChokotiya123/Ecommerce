const catchAsyncErrors = require("../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Razorpay = require("razorpay");
// its use the stripe gateways
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

//its use the Rozarpay gateways

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  console.log("dsadasda:", req.body);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: req.body.price,
      currency: "INR",
    };
    // console.log("Options:", options);
    // const order = await instance.orders.create({
    //   "amount": 50000,
    //   "currency": "INR",
    //   "receipt": "receipt#1",
    //   "partial_payment": false,
    //   "notes": {
    //     "key1": "value3",
    //     "key2": "value2"
    //   }
    // })
    const order = await instance.orders.create(options);
    console.log("Order:", order);
    if (!order) res.send("Some error occured");
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

exports.payOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order.create({
      isPaid: true,
      amount: amount,
      razorpay: {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    console.log("Data:", newOrder);
    await res.send({ msg: "payment was successfull" });
  } catch (error) {
    res.send(error);
  }
});

exports.paymentResponse = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  console.log(orders);
  res.send(orders);
});
