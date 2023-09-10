const router = require("express").Router();
const authMiddleware = require("../middlewares/auth-middleware");
const {
  getAllReviews,
  findReviewById,
  findReviewByUserId,
  getUserReviews,
  createReview,
} = require("../controllers/reviews-controllers");

router.get("/", getAllReviews);

router.get("/:id", findReviewById);

router.get("/user/:id", findReviewByUserId);

router.get("/my", getUserReviews);

router.post("/", authMiddleware, createReview);

module.exports = router;
