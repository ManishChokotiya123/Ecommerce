const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordercontroller");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderSchema:
 *       type: object
 *       properties:
 *         itemsPrice:
 *           type: string
 *           description: Enter the itemsPrice .
 *         taxPrice:
 *           type: string
 *           description: Enter the taxPrice.
 *         shippingPrice:
 *           type: string
 *           description: Enter the shippingPrice.
 *         totalPrice:
 *           type: string
 *           description: Enter the totalPrice.
 *         orderItems:
 *           type: object
 *           properties:
 *             name:
 *                type: string
 *             price:
 *                type: string
 *             quantity:
 *                type: string
 *             productId:
 *                type: string
 *         shippingInfo:
 *           type: object
 *           properties:
 *             address:
 *                type: string
 *             city:
 *                type: string
 *             state:
 *                type: string
 *             country:
 *                type: string
 *             pinCode:
 *                type: string
 *             phoneNo:
 *                type: string
 *         paymentInfo:
 *           type: object
 *           properties:
 *             id:
 *                type: string
 *             status:
 *                type: string
 */
/**
 * @swagger
 * /order/new:
 *   post:
 *     summary: Add a new Order.
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     requestBody:
 *       description: Enter the shippingInfo,orderItems,payementInfo,itemsPrice,taxPrice,shippingPrice,totalPrice category,stock and store the database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *     responses:
 *       201:
 *         description: Order confrom successfully.
 *       404:
 *         description: Internal Server Error.
 */
router.post("/order/new", isAuthenticatedUser, newOrder);
/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Show Product by id
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     description: Show a Product specific user from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Product and Show the Product
 *     responses:
 *       200:
 *         description: Order Fetch successfully
 *       404:
 *         description: Order not found
 */
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Show Order
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     description: Show a Product specific user from the database.
 *     responses:
 *       200:
 *         description: Order Fetch successfully
 *       404:
 *         description: Order not found
 */
router.get("/orders/me", isAuthenticatedUser, myOrders);
/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Show Order
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     description: Show the Order when roles admin then so show the order and else error.
 *     responses:
 *       200:
 *         description: Order Fetch successfully
 *       404:
 *         description: Order not found
 */
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);
/**
 * @swagger
 * /admin/order/{id}:
 *   put:
 *     summary: Show Order
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     description: Show the Order when roles admin then so show the order and else error.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Product and Show the Product
 *     requestBody:
 *       description: Enter the shippingInfo,orderItems,payementInfo,itemsPrice,taxPrice,shippingPrice,totalPrice category,stock and store the database
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *     responses:
 *       200:
 *         description: Order Fetch successfully
 *       404:
 *         description: Order not found
 */
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);
/**
 * @swagger
 * /admin/order/:id:
 *   delete:
 *     summary: Show Product by id
 *     tags:
 *       - Order
 *     security:
 *        - Authorization: []
 *     description: Show a Product specific user from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Product and Show the Product
 *     responses:
 *       200:
 *         description: Order Delete successfully
 *       404:
 *         description: Order not found
 */
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
