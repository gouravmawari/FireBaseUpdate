const express = require("express");
const SignUpController = require("../controller/signup.controller");
const router = express.Router();
const PasswordController = require("../controller/password.controller");

router.post("/signUp", SignUpController.SignUp.bind(SignUpController));
router.post("/verify-phone",SignUpController.VerifyPhoneOTP.bind(SignUpController));
router.post("/google-auth",SignUpController.GoogleSignUp.bind(SignUpController));
router.post("/set-password",PasswordController.sendPasswordReset.bind(PasswordController));

//for Email verification
// router.patch("/verify",SignUpController.Verify.bind(SignUpController));

module.exports = router;