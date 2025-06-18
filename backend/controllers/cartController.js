const Cart = require("../models/cartModel")
const Ebook = require("../models/ebookModel")
const asyncHandler = require("express-async-handler")


const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  console.log("Add to cart request for user:", userId, "ebook id:", id);

  let cart = await Cart.findOne({ userId });

  const ebook = await Ebook.findOne({ id });

  if (!ebook) {
    res.status(404);
    throw new Error("Ebook not found");
  }

  if (!cart) {
    cart = new Cart({
      userId,
      cartList: [ebook]
    });
  } else {
    const existingCartIndex = cart.cartList.findIndex(
      item => item.id === id
    );

    if (existingCartIndex !== -1) {
      res.status(400);
      throw new Error("Already added to cart");
    }

    cart.cartList.push(ebook);
  }

  const savedCart = await cart.save();
  res.status(200).json(savedCart);
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("Get cart request for user:", userId);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart);
});


const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  console.log("Remove from cart request for user:", userId, "ebook id:", id);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const updatedCartList = cart.cartList.filter(item => item.id !== id);

  if (updatedCartList.length === cart.cartList.length) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  cart.cartList = updatedCartList;
  const savedCart = await cart.save();

  res.status(200).json(savedCart);
});


const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("Clear cart request for user:", userId);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.cartList = [];
  const clearedCart = await cart.save();

  res.status(200).json(clearedCart);
});



module.exports= {
    addToCart,
    getUserCart,
    removeFromCart,
    clearCart
}