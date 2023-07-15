const mongoose = require("mongoose");
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  menu: [
    {
      _id:false,
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        default: "none",
      },
    },
  ],
  ratings: {
    type: Object,
    overall: {
      type: Number,
    },
    staff: {
      type: Number,
    },
    food: {
      type: Number,
    },
    ambience: {
      type: Number,
    },
    services: {
      type: Number,
    },
    numberOfRatings: {
      type: Number,
    },
    default: {
      overall: 0,
      staff: 0,
      food: 0,
      ambience: 0,
      services: 0,
      numberOfRatings: 0,
    },
  },
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);
module.exports = Restaurant;
