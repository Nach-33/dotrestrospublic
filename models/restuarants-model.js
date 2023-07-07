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
      name: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
        unique: true,
      },
    },
  ],
  ratings: {
    type: Object,
    overall: {
      type: Number,
      default: 0,
    },
    staff: {
      type: Number,
      default: 0,
    },
    food: {
      type: Number,
      default: 0,
    },
    ambience: {
      type: Number,
      default: 0,
    },
    services: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);
module.exports = Restaurant;
