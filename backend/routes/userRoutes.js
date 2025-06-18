const express = require('express');
const User = require('../models/userModel');
const { registerUser, loginUser, logout, registerAdmin, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/logout', logout)
router.get('/profile', protect, getUserProfile)

router.post('/', registerUser);
router.post('/registerAdmin', registerAdmin);
router.post('/login', loginUser)

module.exports = router;
