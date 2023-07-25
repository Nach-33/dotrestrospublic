const router = require("express").Router();
const { orderPayment } = require("../controllers/payments-controllers");
const ccavReqHandler = require("../config/ccavRequestHandler")
const ccavResHandler = require("../config/ccavResponseHandler.js");

router.post("/:id", orderPayment);

router.post("/ccavRequestHandler", function (request, response) {
  ccavReqHandler.postReq(request, response);
});

router.post("/ccavResponseHandler", function (request, response) {
  ccavResHandler.postRes(request, response);
});

module.exports = router;