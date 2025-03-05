const express = require("express");
const CommentController = require("../controller/comment.controller");

const router = express.Router();

router.post("/", CommentController.CreateComment.bind(CommentController));
router.post("/reply", CommentController.CommentReply.bind(CommentController));

module.exports = router;
