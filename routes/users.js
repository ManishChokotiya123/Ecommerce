var express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/usercontrl");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
var router = express.Router();
var upload = require("../utilis/index");
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Enter the email and check the email in database .
 *         password:
 *           type: string
 *           description: Enter the Password and check the Password in database .
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Create a Login Api.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       201:
 *         description: Example created successfully.
 */
router.post("/login", loginUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Enter the email.
 *         password:
 *           type: string
 *           description: Enter the Password .
 *         name:
 *           type: string
 *           description: Enter the Name  .
 *         url:
 *           type: file
 *           description: Choose the user profile .
 *         role:
 *           type: string
 *           description: Enter the role.
 *       required:
 *         - email
 *         - password
 *         - name
 *         - role
 *         - url
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Enter the name,email,password,role,image stored the database
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: Example created successfully.
 */
router.post("/register", upload.single("url"), registerUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     forgetPasswordSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Enter the email.
 *       required:
 *         - email
 *
 */
/**
 * @swagger
 * /users/password/forgot:
 *   post:
 *     summary: Create a forgot Password Api.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Enter the Email check the email in database send the email for forgotpassword link.
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgetPasswordSchema'
 *     responses:
 *       201:
 *         description: Example created successfully.
 */
router.post("/password/forgot", forgotPassword);
/**
 * @swagger
 * components:
 *   schemas:
 *     updateuserpasswordSchema:
 *       type: object
 *       properties:
 *        password:
 *           type: string
 *           description: Enter the Password.
 *        confirmPassword:
 *           type: string
 *           description: Enter the confirmPassword.
 *       required:
 *         - password
 *         - confrimpassword
 *
 */
/**
 * @swagger
 * /users/password/reset/{token}:
 *   post:
 *     summary: upadte User password
 *     tags:
 *       - Users
 *     description: update a specific user role field in the database
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to check the Id
 *     requestBody:
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateuserpasswordSchema'
 *     responses:
 *       200:
 *         description: User Password Reset SuccessFully
 *       404:
 *         description: User not found
 */
router.put("/password/reset/:token", resetPassword);
/**
 * @swagger
 * /users/me:
 *  get:
 *    tags:
 *       - Users
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
router.get("/me", isAuthenticatedUser, getUserDetails);
/**
 * @swagger
 * /users/admin/users:
 *  get:
 *    tags:
 *       - Users
 *    security:
 *        - Authorization: []
 *    description: Get all the users from DB if roles is admin then show the user
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Users fetched successfully.
 */
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);
/**
 * @swagger
 * /users/admin/user/{id}:
 *   get:
 *     summary: Show User ById
 *     tags:
 *       - Users
 *     security:
 *        - Authorization: []
 *     description: Show the User in database  byId
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
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);
/**
 * @swagger
 * components:
 *   schemas:
 *     upadtepasswordSchema:
 *       type: object
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: Enter the OldPassword.
 *         newPassword:
 *           type: string
 *           description: Enter the newPassword .
 *         confirmPassword:
 *           type: string
 *           description: Enter the confirmPassword  .
 *       required:
 *         - oldPassword
 *         - newPassword
 *         - confirmPassword
 */
/**
 * @swagger
 * /users/password/update:
 *   put:
 *     summary: User update the profile.
 *     tags:
 *       - Users
 *     security:
 *        - Authorization: []
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/upadtepasswordSchema'
 *     responses:
 *       201:
 *         description: update Password successfully.
 */
router.put("/password/update", isAuthenticatedUser, updatePassword);
/**
 * @swagger
 * /users/me/update:
 *   put:
 *     summary: User update the profile.
 *     tags:
 *       - Users
 *     security:
 *        - Authorization: []
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: Example created successfully.
 */
router.put(
  "/me/update",
  upload.single("url"),
  isAuthenticatedUser,
  updateProfile
);
/**
 * @swagger
 * components:
 *   schemas:
 *     updateuserroleSchema:
 *       type: object
 *       properties:
 *        role:
 *           type: string
 *           description: Enter the Role.
 *       required:
 *         - role
 *
 */
/**
 * @swagger
 * /users/admin/user/{id}:
 *   put:
 *     summary: upadte UserRole
 *     tags:
 *       - Users
 *     security:
 *        - Authorization: []
 *     description: update a specific user role field in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to check the Id
 *     requestBody:
 *       description: Example object that needs to be added.
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateuserroleSchema'
 *     responses:
 *       200:
 *         description: User Updated Role successfully
 *       404:
 *         description: User not found
 */
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);
/**
 * @swagger
 * /users/admin/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
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
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);
/**
 * @swagger
 * /users/logout:
 *   get:
 *     tags:
 *        - Users
 *     summary: User logout
 *     description: Logout the currently authenticated user
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
router.get("/logout", logout);

module.exports = router;
