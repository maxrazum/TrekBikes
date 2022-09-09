const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Cannot Be Blank']
    },
    price: {
        type: Number,
        required: [true, 'Cannot Be Blank'],
        min: 0
    },
    category: {
        type: String,
        lowercase: [true, 'Cannot Be Blank'],
        enum: ['mountain', 'hybrid', 'road']
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;