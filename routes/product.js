const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productcontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../utilis/index");
const router = express.Router();
/**
 * @swagger
 * /admin/products:
 *  get:
 *    tags:
 *       - Products
 *
 *    description: Get all the users from DB
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Product fetched successfully.
 */
router.get("/products", getAllProducts);
/**
 * @swagger
 * /admin/products:
 *  get:
 *    tags:
 *       - Products
 *    security:
 *        - Authorization: []
 *
 *    description: Get all the Products from DB
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Product fetched successfully.
 *      '401':
 *        description: Internal Server Error.
 */
router.get(
  "/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductsSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Enter the name.
 *         description:
 *           type: string
 *           description: Enter the description.
 *         price:
 *           type: string
 *           description: Enter the Price.
 *         ratings:
 *           type: string
 *           description: Choose the ratings.
 *         url:
 *           type: file
 *           description: choose the iamge.
 *         category:
 *           type: string
 *           description: Enter the category.
 *         stock:
 *           type: string
 *           description: Enter the stock.
 *       required:
 *         - name
 *         - description
 *         - price
 *         - ratings
 *         - url
 *         - category
 *         - stock
 */
/**
 * @swagger
 * /admin/product/new:
 *   post:
 *     summary: Add a new Product.
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Enter the name,description,price,ratings,url category,stock and store the database
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductsSchema'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       404:
 *         description: Internal Server Error.
 */
router.post(
  "/product/new",
  isAuthenticatedUser,
  upload.array("url", 5),
  authorizeRoles("admin"),
  createProduct
);
/**
 * @swagger
 * /admin/product/{id}:
 *   put:
 *     summary: User update the profile.
 *     tags:
 *       - Products
 *     security:
 *        - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to check the Id
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: file
 *         description: The ID of the user to check the Id
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: update Password successfully.
 */
router.put(
  "/product/:id",
  isAuthenticatedUser,
  upload.array("url", 5),
  authorizeRoles("admin"),
  updateProduct
);
/**
 * @swagger
 * /admin/product/{id}:
 *   delete:
 *     summary: Delete a Product
 *     tags:
 *       - Products
 *     security:
 *        - Authorization: []
 *     description: Delete a specific user from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);
/**
 * @swagger
 * /admin/product/{id}:
 *   get:
 *     summary: Show Product by id
 *     tags:
 *       - Products
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
 *         description: Product Fetch successfully
 *       404:
 *         description: Prodcut not found
 */
router.get("/product/:id", getProductDetails);
/**
 * @swagger
 * components:
 *   schemas:
 *     reviewSchema:
 *       type: object
 *       properties:
 *         rating:
 *           type: string
 *           description: Enter the Rating .
 *         comment:
 *           type: string
 *           description: Enter the Comment.
 *         productId:
 *           type: string
 *           description: Enter the ProductID.
 *       required:
 *         - productId
 *         - rating
 *         - comment
 */
/**
 * @swagger
 * /admin/review:
 *   post:
 *     summary: Create a review Api.
 *     tags:
 *       - Reviews
 *     security:
 *        - Authorization: []
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reviewSchema'
 *     responses:
 *       201:
 *         description: Example created successfully.
 */
router.put("/review", isAuthenticatedUser, createProductReview);
/**
 * @swagger
 * /admin/reviews:
 *  get:
 *    tags:
 *       - Reviews
 *    security:
 *        - Authorization: []
 *
 *    description: Get all the users from DB
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Users fetched successfully.
 */
router.get("/reviews", getProductReviews);
/**
 * @swagger
 * /admin/reqviews/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Reviews
 *     security:
 *        - Authorization: []
 *     description: Delete a specific user from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
