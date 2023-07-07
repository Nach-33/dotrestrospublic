const router = require("express").Router();
const Restaurant = require("../models/restuarants-model");

router.post("/add", async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.json({ message: "successfully created", newRestaurant });
  } catch (error) {
    console.log(error);
    res.statusCode(500).json({ message: error.message });
  }
});

module.exports = router;
