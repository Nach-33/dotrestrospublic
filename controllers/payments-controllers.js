const Order = require("../models/orders-model");

const orderPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.json({ message: "No Order Found!" });
    order.paid = true;
    order.save();
    return res.json({ message: "Order Accepted Successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderPayment };
