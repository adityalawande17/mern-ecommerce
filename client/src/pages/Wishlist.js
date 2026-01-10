import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, moveToCart } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              padding: "60px 40px",
              borderRadius: "20px",
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "5rem", marginBottom: "20px" }}>❤️</div>
            <h2
              style={{
                color: isDarkMode ? "#ffffff" : "#333",
                marginBottom: "15px",
                fontSize: "2rem",
              }}
            >
              Your Wishlist is Empty
            </h2>
            <p
              style={{
                color: isDarkMode ? "#cccccc" : "#666",
                marginBottom: "30px",
                fontSize: "1.1rem",
              }}
            >
              Save your favorite items here!
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "15px 40px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
              }}
            >
              Explore Products
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
          padding: "20px",
          transition: "background-color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "1.8rem",
                color: isDarkMode ? "#ffffff" : "#333",
                fontWeight: "700",
              }}
            >
              My Wishlist ({wishlist.length}{" "}
              {wishlist.length === 1 ? "item" : "items"})
            </h1>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {wishlist.map((item) => (
              <div
                key={item._id}
                style={{
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: isDarkMode
                    ? "0 2px 8px rgba(0,0,0,0.5)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  border: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  onClick={() => navigate(`/product/${item._id}`)}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: isDarkMode ? "#ffffff" : "#333",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    color: isDarkMode ? "#999" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.description.substring(0, 50)}...
                </p>
                <p
                  style={{
                    margin: "0 0 15px 0",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#28a745",
                  }}
                >
                  ₹{item.price}
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => moveToCart(item)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item)}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
