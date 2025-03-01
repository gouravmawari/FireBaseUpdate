const express = require("express");
const SignUpController = require("../controller/signup.controller");
const PostController = require("../controller/post.controller");
const router = express.Router();
router.post("/signUp", SignUpController.SignUp.bind(SignUpController));
router.post("/post", PostController.createPost.bind(PostController));

module.exports = router;
