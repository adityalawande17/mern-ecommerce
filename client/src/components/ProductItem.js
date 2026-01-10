import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart, addToWishlist } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="product-card"
      style={{
        border: isDarkMode ? "1px solid #444" : "1px solid #ddd",
        borderRadius: "12px",
        width: "300px",
        padding: "20px",
        margin: "16px",
        boxShadow: isDarkMode
          ? "0 4px 6px rgba(0, 0, 0, 0.5)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // ← IMPORTANT: Added this for absolute positioning
      }}
    >
      {/* Wishlist Heart Button - TOP RIGHT CORNER */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          addToWishlist(product);
        }}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 10,
          transition: "all 0.3s ease",
        }}
        // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Add to Wishlist"
      >
        ❤️
      </div>

      {/* Product Image */}
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.name}
        onClick={handleViewDetails}
        style={{
          cursor: "pointer",
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "12px",
        }}
      />

      {/* Product Details */}
      <div
        className="product-details"
        style={{ textAlign: "center", width: "100%" }}
      >
        <h3
          style={{
            fontWeight: "700",
            cursor: "pointer",
            color: isDarkMode ? "#ffffff" : "#333",
            fontSize: "1.1rem",
            margin: "10px 0",
          }}
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontWeight: "300",
            color: isDarkMode ? "#cccccc" : "#666",
            fontSize: "0.9rem",
            margin: "8px 0",
          }}
        >
          {product.description.substring(0, 50)}...
        </p>

        <p
          style={{
            fontWeight: "500",
            color: "#28a745",
            fontSize: "1.2rem",
            margin: "10px 0",
          }}
        >
          Price: ₹{product.price}
        </p>

        <p
          style={{
            fontWeight: "400",
            color: isDarkMode ? "#cccccc" : "#666",
            fontSize: "0.9rem",
            margin: "8px 0",
          }}
        >
          Stock: {product.countInStock}
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleViewDetails}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            View Details
          </button>

          <button
            onClick={() => handleAddToCart(product)}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={() => handleRemoveFromCart(product)}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
