import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import StarRating from "./StarRating";
import axios from "axios";

const ProductReviews = ({ productId }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [userReview, setUserReview] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/product/${productId}`
      );
      setReviews(response.data.reviews || []);

      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        const existingReview = response.data.reviews.find(
          (r) => r.userEmail === userEmail
        );
        setUserReview(existingReview);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please login to write a review");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    setSubmitting(true);

    try {
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");

      const reviewData = {
        productId,
        userId: userEmail,
        userName,
        userEmail,
        rating,
        title: title.trim() || "No title",
        comment: comment.trim(),
      };

      await axios.post("http://localhost:5000/api/reviews", reviewData);

      alert("Review submitted successfully!");
      setRating(0);
      setTitle("");
      setComment("");
      setShowReviewForm(false);
      fetchReviews();
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!isLoggedIn) {
      alert("Please login to mark reviews as helpful");
      return;
    }

    try {
      const userEmail = localStorage.getItem("userEmail");
      await axios.put(`http://localhost:5000/api/reviews/${reviewId}/helpful`, {
        userId: userEmail,
      });
      fetchReviews();
    } catch (error) {
      console.error("Error updating helpful:", error);
    }
  };

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(
          1
        )
      : 0;

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "helpful") {
      return (b.helpful || 0) - (a.helpful || 0);
    }
    return 0;
  });

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
        borderRadius: "15px",
        padding: "30px",
        marginTop: "30px",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.5)"
          : "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <span style={{ fontSize: "2rem" }}>⭐</span>
        <h2
          style={{
            margin: 0,
            fontSize: "1.8rem",
            color: isDarkMode ? "#ffffff" : "#333",
            fontWeight: "700",
          }}
        >
          Customer Reviews
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "30px",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color: "#FFA500",
              marginBottom: "10px",
            }}
          >
            {avgRating}
          </div>
          <StarRating rating={parseFloat(avgRating)} size={24} />
          <p
            style={{
              margin: "10px 0 0 0",
              color: isDarkMode ? "#cccccc" : "#666",
              fontSize: "0.9rem",
            }}
          >
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star];
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div
                key={star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    minWidth: "50px",
                    color: isDarkMode ? "#cccccc" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  {star} ⭐
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    backgroundColor: isDarkMode ? "#444" : "#e0e0e0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      backgroundColor: "#FFA500",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    minWidth: "40px",
                    color: isDarkMode ? "#999" : "#666",
                    fontSize: "0.85rem",
                  }}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {!userReview && isLoggedIn && !showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          style={{
            padding: "15px 30px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
          }}
        >
          ✍️ Write a Review
        </button>
      )}

      {!isLoggedIn && (
        <div
          style={{
            padding: "15px",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
            borderRadius: "10px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: isDarkMode ? "#cccccc" : "#666",
            }}
          >
            Please login to write a review
          </p>
        </div>
      )}

      {showReviewForm && (
        <div
          style={{
            padding: "25px",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: isDarkMode ? "#ffffff" : "#333",
            }}
          >
            Write a Review
          </h3>

          <form onSubmit={handleSubmitReview}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: isDarkMode ? "#cccccc" : "#555",
                }}
              >
                Your Rating *
              </label>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      color: star <= rating ? "#FFA500" : "#D3D3D3",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {rating > 0 && (
                <p
                  style={{
                    marginTop: "10px",
                    color: "#FFA500",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {
                    ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
                      rating
                    ]
                  }
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: isDarkMode ? "#cccccc" : "#555",
                }}
              >
                Review Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                maxLength={100}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: isDarkMode ? "#cccccc" : "#555",
                }}
              >
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                rows="5"
                maxLength={1000}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "0.85rem",
                  color: isDarkMode ? "#999" : "#666",
                  textAlign: "right",
                }}
              >
                {comment.length}/1000
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "transparent",
                  color: isDarkMode ? "#ffffff" : "#666",
                  border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "12px 25px",
                  backgroundColor: submitting ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontWeight: "600",
                }}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      )}

      {reviews.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: isDarkMode ? "#ffffff" : "#333",
              fontSize: "1.2rem",
            }}
          >
            All Reviews ({totalReviews})
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "10px 15px",
              border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "0.9rem",
              backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#333",
              cursor: "pointer",
            }}
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sortedReviews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: isDarkMode ? "#999" : "#666",
            }}
          >
            <p style={{ fontSize: "3rem", margin: "0 0 15px 0" }}>📝</p>
            <p style={{ fontSize: "1.2rem", margin: 0 }}>
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <div
              key={review._id}
              style={{
                padding: "20px",
                border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: isDarkMode ? "#1a1a1a" : "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {review.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontWeight: "600",
                        color: isDarkMode ? "#ffffff" : "#333",
                      }}
                    >
                      {review.userName}
                      {review.verified && (
                        <span
                          style={{
                            marginLeft: "8px",
                            padding: "3px 8px",
                            backgroundColor: "#28a745",
                            color: "white",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          ✓ Verified
                        </span>
                      )}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: isDarkMode ? "#999" : "#666",
                        fontSize: "0.85rem",
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    backgroundColor: "#28a745",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontSize: "1.1rem",
                    }}
                  >
                    {review.rating}
                  </span>
                  <span style={{ color: "white", fontSize: "1.2rem" }}>⭐</span>
                </div>
              </div>

              {review.title && (
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    color: isDarkMode ? "#ffffff" : "#333",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                  }}
                >
                  {review.title}
                </h4>
              )}

              <p
                style={{
                  margin: "0 0 15px 0",
                  color: isDarkMode ? "#cccccc" : "#555",
                  lineHeight: "1.6",
                }}
              >
                {review.comment}
              </p>

              <div
                style={{
                  paddingTop: "15px",
                  borderTop: isDarkMode
                    ? "1px solid #444"
                    : "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => handleHelpful(review._id)}
                  disabled={!isLoggedIn}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "transparent",
                    color: isDarkMode ? "#ffffff" : "#333",
                    border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                    borderRadius: "6px",
                    cursor: isLoggedIn ? "pointer" : "not-allowed",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  👍 Helpful ({review.helpful || 0})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
