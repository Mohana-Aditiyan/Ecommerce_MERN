const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartByUser,
} = require("../controllers/cartController");

// Add product to cart
router.post("/add", addToCart);

// Get cart items for a user
router.post("/list", getCartByUser);

module.exports = router;
