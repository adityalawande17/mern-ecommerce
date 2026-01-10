import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { itemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { itemsInCart, totalPrice, searchQuery, setSearchQuery, wishlist } =
    useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      className="header"
      style={{
        backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f9fa",
        color: isDarkMode ? "#ffffff" : "#333",
        transition: "all 0.3s ease",
      }}
    >
      <div className="navbar-brand">
        <img
          src="/images/logo.png"
          alt="AdiStore's Logo"
          onClick={() => navigate("/")}
          style={{
            height: "50px",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          // onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          // onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        />
      </div>

      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: "500px",
          margin: "0 20px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: "25px",
            padding: "8px 15px",
            border: "2px solid #e5e7eb",
            transition: "all 0.3s ease",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{ color: "#6b7280", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              width: "100%",
              fontSize: "16px",
              color: "#374151",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "18px",
                padding: "0 5px",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="navbar-items">
        {/* Login/Logout Section */}
        {isLoggedIn ? (
          <>
            <span
              style={{
                color: isDarkMode ? "#4ade80" : "green",
                marginRight: "20px",
              }}
            >
              Welcome, {userName}!
            </span>

            {/* Wishlist Icon - MOVED BEFORE PROFILE */}
            <div
              onClick={() => navigate("/wishlist")}
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
                marginRight: "20px",
              }}
              title="Wishlist"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2767/2767003.png"
                alt="Wishlist"
                style={{
                  width: "35px",
                  height: "35px",
                  transition: "transform 0.3s ease",
                }}
              />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px", // ← Same as wishlist
                    height: "20px", // ← Same as wishlist
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px", // ← Smaller font
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Cart Icon - SMALLER BADGE */}
            <div
              onClick={() => navigate("/cart")}
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
                marginRight: "20px",
              }}
              title="Cart"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3799/3799884.png"
                alt="Cart"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                }}
              />
              {itemsInCart > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px", // ← FIXED: Smaller badge
                    height: "20px", // ← FIXED: Smaller badge
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px", // ← FIXED: Smaller font
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {itemsInCart}
                </span>
              )}
            </div>

            {/* Profile Icon - MOVED TO RIGHTMOST */}
            <div
              onClick={() => navigate("/profile")}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.3rem",
                color: "white",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                border: "3px solid white",
                position: "relative",
              }}
              title="View Profile"
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "8px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "8px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "20px",
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
