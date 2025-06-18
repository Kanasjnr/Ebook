const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");



const adminProtect = asyncHandler(async (req, res, next) => {
  
 
    const token = req.cookies.token;

    if (!token) {
      res.status(401); //unauthorized

      throw new Error("not authorized👮");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404); //Not found

      throw new Error("User not found❌");
    }

    if (!user.isAdmin) {
      res.status(401); //unathorized

      throw new Error("Not an Admin👮");
    }

    req.user = user;
    next()

 
});

const protect = asyncHandler(async (req, res, next) => {
   
 
    const token = req.cookies.token;

    if (!token) {
      res.status(401); //unauthorized

      throw new Error("not authorized👮");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404); //Not found

      throw new Error("User not found❌");
    }

    

    req.user = user;
    next()

 
});

module.exports = {
  adminProtect,
  protect,
};