const Order = require("../models/orders-model");
const User = require('../models/users-model')

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { username, orders } = user;
    const userData = { username };
    const ordersList = [];
    //Fetching complete order details from their ids for a user
    if (orders === [] || orders== undefined) {
      userData.orders = [];
      return res.json(userData);
    }

    orders.forEach((order) => {
      ordersList.push(Order.findById(order.id));
    });
    // Letting all the promises get fulfilled
    userData.orders = await Promise.all(ordersList);
    return res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile };
