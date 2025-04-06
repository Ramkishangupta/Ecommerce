const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
const {isAuthencatedUser,authiorizeRoles} = require("../middleware/Auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(getUserDetails);
router.route("/logout").post(isAuthencatedUser,logout);
router.route("/password/update").put(updateUserPassword);  
router.route("/me/update").put(isAuthencatedUser,updateUserProfile);
router.route("/admin/users").get(isAuthencatedUser,authiorizeRoles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthencatedUser,authiorizeRoles("admin"),getSingleUser);
router.route("/admin/user/:id").put(isAuthencatedUser,authiorizeRoles("admin"),updateUserRole);
router.route("/admin/user/:id").delete(isAuthencatedUser,authiorizeRoles("admin"),deleteUser);
module.exports = router;

