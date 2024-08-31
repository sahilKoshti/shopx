const express = require("express");
const router = express.Router();

const {
    processPayment,
    sendStripApi,
} = require("../controller/paymentController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(sendStripApi);

module.exports = router;
