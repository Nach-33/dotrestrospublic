const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  userDetails: {
    type: Object,
    required: true,
    username: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  restaurant: {
    type: Object,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: {
    type: Object,
    overall: {
      type: Number,
      required: true,
    },
    staff: {
      type: Number,
      required: true,
    },
    food: {
      type: Number,
      required: true,
    },
    ambience: {
      type: Number,
      required: true,
    },
    services: {
      type: Number,
      required: true,
    },
  },
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
