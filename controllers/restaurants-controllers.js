const Restaurant = require("../models/restuarants-model");

const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    if(!newRestaurant) res.json({ message: "unsuccessful" });
    else res.json({ message: "successfully created", newRestaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      return res.json({ message: "no restaurant found" });
    }
    res.json({ message: "restaurants found", restaurants });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantDetails = async (req, res) => {
  try {
    const code = req.params.code;
    const restaurant = await Restaurant.findOne({code});
    if (!restaurant) {
      return res.json({ message: "restaurant not found" });
    }
    res.json({ message: "restaurant found", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRestaurant, getAllRestaurants, getRestaurantDetails };
