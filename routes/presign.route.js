const express = require("express");
const PresignURLController = require("../controller/presignurl.controller");

const router = express.Router();
router.post("/",PresignURLController.genpresignurl.bind(PresignURLController));
module.exports = router;