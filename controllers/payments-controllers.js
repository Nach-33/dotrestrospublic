const Order = require("../models/orders-model");
const Restaurant = require("../models/restuarants-model");

const orderPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.json({ message: "No Order Found!" });
    order.paid = true;
    await order.save();
    const thisRestaurant = await Restaurant.findOne({code: order.restaurant.code});
    thisRestaurant.advancePaid += order.bookingDetails.advance;
    await thisRestaurant.save();
    global.io.emit('newOrder',{order});
    return res.redirect(`${process.env.FRONTEND_URI}/myorders`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderPayment };
