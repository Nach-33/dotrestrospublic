const router = require("express").Router();
const {
  sendNewOrder,
  findOrderById,
  cancelOrderById,
  getAllOrders,
  acceptOrder,
  declineOrder
} = require("../controllers/orders-controllers");

router.post("/", sendNewOrder);

router.get("/:id", findOrderById);

router.delete("/:id", cancelOrderById);

router.get("/", getAllOrders);

router.patch('/accept/:id', acceptOrder);

router.patch('/decline/:id', declineOrder);

module.exports = router;
