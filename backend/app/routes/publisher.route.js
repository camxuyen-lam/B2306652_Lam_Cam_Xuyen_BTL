const express = require("express");
const publishers = require("../controllers/publisher.controller");
const router = express.Router();
router.route("/").get(publishers.findAll).post(publishers.create);
module.exports = router;