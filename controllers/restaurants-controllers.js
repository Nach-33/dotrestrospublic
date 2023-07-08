const Order = require("../models/orders-model");

const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.json({ message: "successfully created", newRestaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.json({ message: "restaurant not found" });
    }
    res.json({ message: "restaurant found", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRestaurant, getRestaurantDetails };
