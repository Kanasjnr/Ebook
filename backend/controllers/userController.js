const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
     const { name, email, password } = req.body;
     console.log(" Registration attempt for email:", email);

     // validate input
     if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
     }

     if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
     }

     // check if user exists
     const userExist = await User.findOne({ email });

     if (userExist) {
        res.status(400);
        throw new Error("Email already in use");
     }

     // hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // create the user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
     });

     console.log(" User created successfully:", user._id);
     
     const token = generateToken(user._id);
     console.log(" Token generated:", token ? "SUCCESS" : "FAILED");
     console.log(" Token value:", token);

     // send http-only cookie
     res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true,
     });

     if (user) {
          const { _id, name, email, isAdmin, orderList, cartList } = user;
          const responseData = {
            _id,
            name,
            email,
            isAdmin,
            orderList,
            cartList,
            token,
          };
          console.log(" Sending response with token:", !!responseData.token);
          res.status(201).json(responseData);
     } else {
          res.status(400);
          throw new Error('Invalid user data');
     }
});


const registerAdmin = asyncHandler(async (req, res) => {
     const { name, email, password } = req.body;

     // validate input
     if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
     }

     if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
     }

     // check if user exists
     const userExist = await User.findOne({ email });

     if (userExist) {
        res.status(400);
        throw new Error("Email already in use");
     }

     // hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // create the user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: true
     });

     const token = generateToken(user._id);

     // send http-only cookie
     res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true,
     });

     if (user) {
          const { _id, name, email, isAdmin, orderList, cartList } = user;
          res.status(201).json({
            _id,
            name,
            email,
            isAdmin,
            orderList,
            cartList,
            token,
          });
     } else {
          res.status(400);
          throw new Error('Invalid user data');
     }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(" Login attempt for email:", email);

    
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    
    const user = await User.findOne({ email });

    if (!user) {
        console.log(" User not found for email:", email);
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log(" Password mismatch for email:", email);
        res.status(401);
        throw new Error("Invalid email or password");
    }

    console.log(" Password match for user:", user._id);

    // Generate token
    const token = generateToken(user._id);
    console.log(" Login token generated:", token ? "SUCCESS" : "FAILED");
    console.log(" Login token value:", token);

    // Send HTTP-only cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
    });

    // Send user data
    const { _id, name, isAdmin, orderList, cartList } = user;
    const responseData = {
        _id,
        name,
        email,
        isAdmin,
        orderList,
        cartList,
        token,
    };
    console.log(" Sending login response with token:", !!responseData.token);
    res.status(200).json(responseData);
});

const logout = asyncHandler (async (req, res)=> { 
      res.cookie('token', '',{
            path:'/',
            httpOnly: true,
            expires: new Date(0), 
            sameSite: 'none',
            secure: true,
      });
      return res.status(200).json ({message: 'Logout successful'})
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user) {
        const { _id, name, email, isAdmin, orderList, cartList } = user;
        res.status(200).json({
            _id,
            name,
            email,
            isAdmin,
            orderList,
            cartList,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    registerAdmin,
    getUserProfile
}