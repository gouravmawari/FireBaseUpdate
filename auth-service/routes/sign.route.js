const express = require("express");
const SignUpController = require("../controller/signup.controller");
const router = express.Router();
router.post("/signUp", SignUpController.SignUp.bind(SignUpController));

module.exports = router;
