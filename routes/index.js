const express = require("express");
const authRoutes = require("./auth.route");
const postRoutes = require("./post.route");
const commentRoutes = require("./comment.route");
const presignURLRouter =require("./presign.route") 

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/presign", presignURLRouter);

module.exports = router;
