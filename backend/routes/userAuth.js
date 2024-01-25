const express = require("express");
const { getUser, createUser } = require("../controller/userController.js");
const { forgotPassword, resetPassword } = require("../controller/authController.js");
// import { getUser, createUser } from "../controller/userController.js";
// import { forgotPassword, resetPassword } from "../controller/authController.js";

const router = express.Router();

router.post("/user/signIn", getUser);
router.post("/user/signUp", createUser);

router.post("/user/forgotPassword", forgotPassword);
router.put("/user/resetPassword", resetPassword);

module.exports = router;