import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import Checkout from "../components/Checkout";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    totalPrice,
    addToWishlist,
    appliedCoupon,
    couponDiscount,
    availableCoupons,
    applyCoupon,
    removeCoupon,
  } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  // Calculate unique items with quantities
  const cartItems = cart.reduce((acc, item) => {
    const existing = acc.find((i) => i._id === item._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMessage(result.message);
    if (result.success) {
      setCouponCode("");
      setTimeout(() => setCouponMessage(""), 3000);
    }
  };

  const handleSelectCoupon = (code) => {
    setCouponCode(code);
    setShowCoupons(false);
  };

  const moveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item);
  };

  // Calculate final total
  const subtotal = totalPrice;
  const discount = couponDiscount;
  const deliveryFee = subtotal > 500 ? 0 : 99;
  const finalTotal = subtotal - discount + deliveryFee;

  if (cart.length === 0) {
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
            <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🛒</div>
            <h2
              style={{
                color: isDarkMode ? "#ffffff" : "#333",
                marginBottom: "15px",
                fontSize: "2rem",
              }}
            >
              Your Cart is Empty
            </h2>
            <p
              style={{
                color: isDarkMode ? "#cccccc" : "#666",
                marginBottom: "30px",
                fontSize: "1.1rem",
              }}
            >
              Add some products to get started!
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "15px 40px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
              }}
            >
              Continue Shopping
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
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "20px",
          }}
        >
          {/* Left Column - Cart Items */}
          <div>
            {/* Header */}
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
                My Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
              </h1>
            </div>

            {/* Cart Items List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: isDarkMode
                      ? "0 2px 8px rgba(0,0,0,0.5)"
                      : "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  {/* Product Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    onClick={() => navigate(`/product/${item._id}`)}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                      borderRadius: "10px",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                      cursor: "pointer",
                      border: isDarkMode
                        ? "1px solid #444"
                        : "1px solid #e5e7eb",
                    }}
                  />

                  {/* Product Details */}
                  <div style={{ flex: 1 }}>
                    <h3
                      onClick={() => navigate(`/product/${item._id}`)}
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: isDarkMode ? "#ffffff" : "#333",
                        cursor: "pointer",
                      }}
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
                      {item.description.substring(0, 60)}...
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: isDarkMode ? "#cccccc" : "#666",
                        }}
                      >
                        Qty: <strong>{item.quantity}</strong>
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button
                        onClick={() => removeFromCart(item)}
                        style={{
                          padding: "6px 15px",
                          backgroundColor: "transparent",
                          color: "#dc3545",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                        }}
                      >
                        Delete
                      </button>
                      <span style={{ color: isDarkMode ? "#444" : "#ddd" }}>
                        |
                      </span>
                      <button
                        onClick={() => moveToWishlist(item)}
                        style={{
                          padding: "6px 15px",
                          backgroundColor: "transparent",
                          color: "#007bff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                        }}
                      >
                        ❤️ Move to Wishlist
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: isDarkMode ? "#ffffff" : "#333",
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: isDarkMode ? "#999" : "#666",
                        textDecoration: "line-through",
                      }}
                    >
                      ₹{Math.floor(item.price * 1.3 * item.quantity)}
                    </p>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "0.85rem",
                        color: "#28a745",
                        fontWeight: "600",
                      }}
                    >
                      {Math.floor(
                        ((item.price * 1.3 - item.price) / (item.price * 1.3)) *
                          100
                      )}
                      % off
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            {/* Apply Coupon */}
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
              {/* Apply Coupon */}
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
                <h3
                  style={{
                    margin: "0 0 15px 0",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Apply Coupon
                </h3>

                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "12px" }}
                >
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                    placeholder="Enter coupon code"
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: isDarkMode ? "1px solid #444" : "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
                      color: isDarkMode ? "#ffffff" : "#333",
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    style={{
                      padding: "12px 25px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                    }}
                  >
                    APPLY
                  </button>
                </div>

                {couponMessage && (
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      padding: "8px 12px",
                      backgroundColor: appliedCoupon ? "#d4edda" : "#f8d7da",
                      color: appliedCoupon ? "#155724" : "#721c24",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                    }}
                  >
                    {couponMessage}
                  </p>
                )}

                {appliedCoupon && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f9ff",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: isDarkMode
                        ? "1px solid #444"
                        : "1px solid #bfdbfe",
                    }}
                  >
                    <div>
                      <strong
                        style={{ color: isDarkMode ? "#ffffff" : "#333" }}
                      >
                        {appliedCoupon.code}
                      </strong>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          fontSize: "0.8rem",
                          color: isDarkMode ? "#cccccc" : "#666",
                        }}
                      >
                        You saved ₹{Math.floor(couponDiscount)}!
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{
                        padding: "5px 12px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setShowCoupons(!showCoupons)}
                  style={{
                    marginTop: "12px",
                    padding: "10px",
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#007bff",
                    border: isDarkMode
                      ? "1px dashed #444"
                      : "1px dashed #007bff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  {showCoupons ? "▲ Hide" : "▼ Show"} Available Coupons
                </button>

                {showCoupons && (
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        onClick={() => handleSelectCoupon(coupon.code)}
                        style={{
                          padding: "12px",
                          backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                          border: isDarkMode
                            ? "1px solid #444"
                            : "1px solid #e5e7eb",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#007bff";
                          e.currentTarget.style.backgroundColor = isDarkMode
                            ? "#2d2d2d"
                            : "#e7f3ff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDarkMode
                            ? "#444"
                            : "#e5e7eb";
                          e.currentTarget.style.backgroundColor = isDarkMode
                            ? "#1a1a1a"
                            : "#f8f9fa";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <strong
                              style={{
                                color: "#007bff",
                                fontSize: "0.95rem",
                              }}
                            >
                              {coupon.code}
                            </strong>
                            <p
                              style={{
                                margin: "3px 0 0 0",
                                fontSize: "0.8rem",
                                color: isDarkMode ? "#cccccc" : "#666",
                              }}
                            >
                              {coupon.description}
                            </p>
                          </div>
                          <span style={{ fontSize: "1.2rem" }}>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div
              style={{
                backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: isDarkMode
                  ? "0 2px 8px rgba(0,0,0,0.5)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : "#333",
                }}
              >
                Order Details
              </h3>

              {/* Order Summary */}
              <div
                style={{
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: isDarkMode
                    ? "0 2px 8px rgba(0,0,0,0.5)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Order Details
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: isDarkMode ? "#cccccc" : "#666" }}>
                      Bag total
                    </span>
                    <span
                      style={{
                        color: isDarkMode ? "#ffffff" : "#333",
                        fontWeight: "600",
                      }}
                    >
                      ₹{subtotal}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: isDarkMode ? "#cccccc" : "#666" }}>
                        Bag discount
                      </span>
                      <span style={{ color: "#28a745", fontWeight: "600" }}>
                        - ₹{Math.floor(discount)}
                      </span>
                    </div>
                  )}

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: isDarkMode ? "#cccccc" : "#666" }}>
                      Delivery Fee
                    </span>
                    <span
                      style={{
                        color:
                          deliveryFee === 0
                            ? "#28a745"
                            : isDarkMode
                            ? "#ffffff"
                            : "#333",
                        fontWeight: "600",
                      }}
                    >
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  {subtotal < 500 && (
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontSize: "0.8rem",
                        color: "#007bff",
                      }}
                    >
                      Add ₹{500 - subtotal} more for FREE delivery
                    </p>
                  )}
                </div>

                <div
                  style={{
                    paddingTop: "15px",
                    borderTop: isDarkMode
                      ? "2px solid #444"
                      : "2px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      color: isDarkMode ? "#ffffff" : "#333",
                    }}
                  >
                    Order Total
                  </span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#28a745",
                    }}
                  >
                    ₹{Math.floor(finalTotal)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById("checkout-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                    marginBottom: "10px",
                  }}
                >
                  PROCEED TO PAYMENT
                </button>

                <button
                  onClick={() => navigate("/products")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "transparent",
                    color: "#007bff",
                    border: isDarkMode ? "2px solid #444" : "2px solid #007bff",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Continue Shopping
                </button>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("checkout-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                  marginBottom: "10px",
                }}
              >
                PROCEED TO PAYMENT
              </button>

              <button
                onClick={() => navigate("/products")}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "#007bff",
                  border: isDarkMode ? "2px solid #444" : "2px solid #007bff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>{" "}
        {/* ← closes the grid (maxWidth: 1400px div) */}
        {/* Checkout / Payment Section */}
        <div
          id="checkout-section"
          style={{
            maxWidth: "800px",
            margin: "30px auto 0",
          }}
        >
          <Checkout
            cartItems={cartItems}
            totalAmount={Math.floor(finalTotal)}
          />
        </div>
      </div>{" "}
      {/* ← closes the outer div with minHeight: 100vh */}
    </>
  );
};

export default Cart;
