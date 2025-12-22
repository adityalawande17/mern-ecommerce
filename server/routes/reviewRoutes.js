const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Get all reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      { createdAt: -1 }
    );

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    const ratingCounts = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    res.json({
      reviews,
      totalReviews: reviews.length,
      avgRating: avgRating.toFixed(1),
      ratingCounts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
});

// Add a new review
router.post("/", async (req, res) => {
  try {
    const { productId, userId, userName, userEmail, rating, title, comment } =
      req.body;

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      userEmail,
      rating,
      title: title || "No title",
      comment,
      verified: false,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
});

// Mark review as helpful
router.put("/:reviewId/helpful", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.helpfulBy.includes(userId)) {
      review.helpful -= 1;
      review.helpfulBy = review.helpfulBy.filter((id) => id !== userId);
    } else {
      review.helpful += 1;
      review.helpfulBy.push(userId);
    }

    await review.save();
    res.json({ message: "Helpful updated", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating helpful", error: error.message });
  }
});

// Delete a review
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reviews" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
});

// Update a review
router.put("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId, rating, title, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own reviews" });
    }

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();
    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
});

module.exports = router;
