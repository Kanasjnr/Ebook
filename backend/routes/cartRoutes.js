const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToCart, removeFromCart, getUserCart, clearCart } = require("../controllers/cartController");
const router = express.Router();





router.post("/addtocart", protect, addToCart)
router.delete("/removeCart", protect, removeFromCart)
router.get("/getCart", protect, getUserCart)
router.delete("/clearCart", protect, clearCart)




module.exports = router