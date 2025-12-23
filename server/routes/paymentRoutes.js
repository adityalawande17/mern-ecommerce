const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const router = express.Router();

// Create payment intent
router.post("/create-order", async (req, res) => {
  try {
    const {
      amount,
      currency = "inr",
      items,
      userId,
      userName,
      userEmail,
    } = req.body;

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses paise/cents
      currency: currency,
      metadata: {
        userId,
        userName,
        userEmail,
      },
    });

    // Save order in database (pending)
    const order = new Order({
      orderId: paymentIntent.id,
      items,
      totalAmount: amount,
      userId,
      userName,
      userEmail,
      status: "pending",
    });

    await order.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment (webhook or frontend confirmation)
router.post("/verify-payment", async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Update order status to paid
    await Order.findOneAndUpdate(
      { orderId },
      {
        paymentId: paymentIntentId,
        status: "paid",
      }
    );

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
