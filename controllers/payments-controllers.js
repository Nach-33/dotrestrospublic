const Order = require("../models/orders-model");

const orderPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.json({ message: "No Order Found!" });
    order.paid = true;
    await order.save();
    const socketName  = 'newOrder'+order.restaurant.code;
    global.io.emit(socketName,{order});
    return res.redirect(`${process.env.FRONTEND_URI}/myorders`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderPayment };
