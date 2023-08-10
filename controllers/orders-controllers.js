const Order = require("../models/orders-model");
const User = require("../models/users-model");
require("dotenv").config();
const { SendMail } = require("../config/nodemailer");

const sendNewOrder = async (req, res) => {
  try {
    //Save a booking to the DB
    const user = await User.findById(req.user.id);
    const orderDetails = req.body;
    orderDetails.userId = user.id;
    orderDetails.customerDetails.emailId = user.email;
    const newOrder = await Order.create(orderDetails);
    //Add the order id to the user's array
    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $push: {
          orders: { id: newOrder.id },
        },
      }
    );
    global.io.emit('check',{newOrder});
    res.send([newOrder, user]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return res.json({ message: "No Order Found!" });
    return res.json({message:"Order Found Successfully",order});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const cancelOrderById = async (req, res) => {
  // Delete an order from DB
  try {
    const orderId = req.params.id;
    const user = req.user;
    await User.findOneAndUpdate(
      { _id: user.id },
      {
        $pull: {
          orders: { id: orderId },
        },
      }
    );
    const order = await Order.findById(orderId);
    order.cancelled = true;
    order.save();
    if (!order) return res.json({ message: "No Order Found!" });
    return res.json({ message: "Order Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const ordersList = await Order.find();
    if(!ordersList) return res.json({message:"No Orders!"});
    return res.json(ordersList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const acceptOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(!order) return res.json({message:"No Order Found!"});
    order.accepted = true;
    order.save();
    return res.json({message:"Order Accepted Successfully", order});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const declineOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(!order) return res.json({message:"No Order Found!"});
    order.declined = true;
    order.save();
    return res.json({message:"Order Declined Successfully", order});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendNewOrder,
  findOrderById,
  cancelOrderById,
  getAllOrders,
  acceptOrder,
  declineOrder,
};
