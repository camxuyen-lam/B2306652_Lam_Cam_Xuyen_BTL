const express = require("express");
const readers = require("../controllers/reader.controller");
const router = express.Router();

router.route("/")
    .get(readers.findAll)
    .post(readers.create);

router.route("/:id")
    .get(readers.findOne);
router.post("/login", readers.login); 
router.route("/:id")
    .get(readers.findOne)
    .put(readers.update) 
    .delete(readers.delete);
module.exports = router;