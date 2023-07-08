const Review = require("../models/reviews-models");
const Restaurant = require("../models/restuarants-model");

const getAllReviews = async (req, res) => {
  try {
    const reviewList = await Review.find();
    res.json(reviewList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findReviewByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const reviewList = await Review.find({ userDatails: { userId: id } });
    res.json(reviewList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { username, id } = req.user;
    const reviewList = await Review.find({
      userDetails: { username: username, userId: id },
    });
    res.json(reviewList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const user = req.user;
    const reviewDetails = req.body;

    const currentRatings = (
      await Restaurant.findOne({
        name: reviewDetails.restaurant.name,
      })
    ).ratings;

    const newRatings = {
      overall: Number(
        (currentRatings.overall * currentRatings.numberOfRatings +
          Number(reviewDetails.ratings.overall)) /
          (currentRatings.numberOfRatings + 1)
      ),
      staff: Number(
        (currentRatings.staff * currentRatings.numberOfRatings +
          Number(reviewDetails.ratings.staff)) /
          (currentRatings.numberOfRatings + 1)
      ),
      food: Number(
        (currentRatings.food * currentRatings.numberOfRatings +
          Number(reviewDetails.ratings.food)) /
          (currentRatings.numberOfRatings + 1)
      ),
      ambience: Number(
        (currentRatings.ambience * currentRatings.numberOfRatings +
          Number(reviewDetails.ratings.ambience)) /
          (currentRatings.numberOfRatings + 1)
      ),
      services: Number(
        (currentRatings.services * currentRatings.numberOfRatings +
          Number(reviewDetails.ratings.services)) /
          (currentRatings.numberOfRatings + 1)
      ),
      numberOfRatings: Number(currentRatings.numberOfRatings + 1),
    };

    const restaurant = await Restaurant.findOne({
      name: reviewDetails.restaurant.name,
    });
    restaurant.ratings = newRatings;
    await restaurant.save();

    reviewDetails.userDetails = {
      username: user.username,
      userId: user.id,
    };
    const review = await Review.create(reviewDetails);

    res.json({ message: "Successfully added review", review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  findReviewById,
  findReviewByUserId,
  getUserReviews,
  createReview,
};
