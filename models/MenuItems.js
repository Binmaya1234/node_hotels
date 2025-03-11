const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste:{
        type: String,
        enum: ['Spicy', 'Sweet', 'Sour', 'Salty'],
        required: true

    },
    is_drink: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});
const MenuItems = mongoose.model('MenuItems', menuSchema);
module.exports = MenuItems;
