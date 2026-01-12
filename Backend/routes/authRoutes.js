const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { createProduct } = require("../controllers/productController");

router.post("/login", login);
router.post("/create", createProduct);

module.exports = router;
