const express = require("express");
const categories = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(categories.findAll).post(categories.create);
router.route("/:id").delete(categories.delete);

module.exports = router;