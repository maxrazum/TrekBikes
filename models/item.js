const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['mountain', 'hybrid', 'electric', 'road']
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;