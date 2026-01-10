import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { itemContext } from "../context/ItemContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = ({ cartItems, totalAmount }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { clearCart } = useContext(itemContext);
  const [loading, setLoading] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const userName = localStorage.getItem("userName") || "Guest";
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
  const userId = localStorage.getItem("userEmail") || "guest";

  useEffect(() => {
    // Initialize Stripe
    const stripe = loadStripe(
      "pk_test_51ShQLJJYzMShb3d2fx90Rw5c4PqvFIDY3jdBuUMYNoePdHUNyoLe5zd6zaekgd7TculwQw9upHKS6BZ20ONWTm9O000bfNnTVx"
    ); // Replace with your key
    setStripePromise(stripe);
  }, []);

  const handlePayment = async () => {
    if (!cartItems.length || totalAmount === 0) return;

    setLoading(true);
    try {
      // Create payment intent
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          amount: totalAmount,
          currency: "inr",
          items: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
          userId,
          userName,
          userEmail,
        }
      );

      setClientSecret(response.data.clientSecret);

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.clientSecret, // Stripe Payment Intent
      });

      if (error) {
        alert("Payment failed: " + error.message);
      }
    } catch (error) {
      alert("Failed to create order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.5)"
          : "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ color: isDarkMode ? "#ffffff" : "#333", marginBottom: "20px" }}
      >
        💳 Complete Your Order
      </h2>

      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: isDarkMode ? "#cccccc" : "#666" }}>
          Order Summary
        </h3>
        <div
          style={{
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !cartItems.length || totalAmount === 0}
        style={{
          width: "100%",
          padding: "18px",
          backgroundColor: "#635bff",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "1.2rem",
          fontWeight: "700",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 6px 20px rgba(99, 91, 255, 0.4)",
        }}
      >
        {loading ? "⏳ Processing..." : `Pay ₹${totalAmount} with Stripe`}
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "0.9rem",
          color: isDarkMode ? "#cccccc" : "#666",
        }}
      >
        🔒 Secure payment powered by Stripe
      </div>
    </div>
  );
};

export default Checkout;
