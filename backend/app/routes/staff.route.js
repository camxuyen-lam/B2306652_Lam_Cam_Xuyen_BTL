const express = require("express");
const staff = require("../controllers/staff.controller");

const router = express.Router();

router.route("/")
    .get(staff.findAll)   
    .post(staff.create);  

router.route("/:id")
    .get(staff.findOne);  

module.exports = router;