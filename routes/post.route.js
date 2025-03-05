const express = require("express");
const PostController = require("../controller/post.controller");

const router = express.Router();

router.post("/", PostController.createPost.bind(PostController));

module.exports = router;
