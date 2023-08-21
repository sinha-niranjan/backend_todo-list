const express = require("express");
const {
  register,
  login,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  getUser,
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated,deleteMyProfile);
router.route("/user").get(getUser)

module.exports = router;
