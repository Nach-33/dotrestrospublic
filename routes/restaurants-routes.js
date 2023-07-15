const router = require("express").Router();
const Restaurant = require("../models/restuarants-model");
const {
  createRestaurant,
  getRestaurantDetails,
} = require("../controllers/restaurants-controllers");

router.post("/", createRestaurant);

router.get("/:id", getRestaurantDetails);

module.exports = router;
