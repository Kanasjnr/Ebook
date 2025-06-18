const express = require("express");
const { createEbook, updateEbook, getAllEbooks, getAnEbook, getFeaturedProducts } = require("../controllers/productController");
const { adminProtect } = require("../middleware/authMiddleware");
const router = express.Router();

// Admin routes
router.post("/createEbook", adminProtect, createEbook)
router.patch("/updateEbook/:id", adminProtect, updateEbook)

// Public routes
router.get("/", getAllEbooks) // GET /api/product
router.get("/featured", getFeaturedProducts) // GET /api/product/featured  
router.get("/:id", getAnEbook) // GET /api/product/:id

module.exports = router