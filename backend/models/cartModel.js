const mongoose = require('mongoose');



const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    cartList:{
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Cart", cartSchema)