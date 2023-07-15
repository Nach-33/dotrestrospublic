const router = require("express").Router();
const Restaurant = require("../models/restuarants-model");
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantDetails,
} = require("../controllers/restaurants-controllers");

router.post("/", createRestaurant);

router.get("/", getAllRestaurants);

router.get("/:code", getRestaurantDetails);

module.exports = router;
