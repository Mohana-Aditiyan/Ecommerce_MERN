const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartByUser
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.post("/list", getCartByUser);

module.exports = router;
