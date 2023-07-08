const router = require("express").Router();
const Restaurant = require("../models/restuarants-model");
const {
  createRestaurant,
  getRestaurantDetails,
} = require("../controllers/restaurants-controllers");

router.post("/add", createRestaurant);

router.get("/find/:id", getRestaurantDetails);

module.exports = router;
