const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsWithFilter,
} = require("../controllers/productController");

// Open API (no auth for now)
router.post("/create", createProduct);
// Get all products
// new payload-based filter
router.post("/list", getProductsWithFilter);

module.exports = router;
