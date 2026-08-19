const express = require("express");
const borrow = require("../controllers/borrow.controller");
const router = express.Router();

router.route("/").get(borrow.findAll);
router.route("/request").post(borrow.createRequest);

router.route("/:id/approve").put(borrow.approveBorrow);
router.route("/:id/reject").put(borrow.rejectBorrow);
router.route("/:id/return").put(borrow.returnBook);
router.route("/:id/user-lost").put(borrow.reportLostUser);
router.route("/:id/user-paid").put(borrow.userConfirmPayment);
router.route("/:id/admin-confirm").put(borrow.adminConfirmFine);
router.put("/:id/feedback", borrow.sendFeedback);
module.exports = router;