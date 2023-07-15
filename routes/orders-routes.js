const router = require("express").Router();
const {
  sendNewOrder,
  findOrderById,
  cancelOrderById,
  orderPayment,
  getAllOrders,
} = require("../controllers/orders-controllers");

router.post("/", sendNewOrder);

router.get("/:id", findOrderById);

router.delete("/:id", cancelOrderById);

router.post("/payment/:id", orderPayment);

router.get("/", getAllOrders);

module.exports = router;
