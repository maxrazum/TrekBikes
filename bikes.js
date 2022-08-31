const mongoose = require('mongoose');

const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/trekBikes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log("Mongo connection error")
        console.log(err)
    });

const p = new Item({
    name: 'FX 3',
    price: 1149.99,
    category: 'hybrid'
});

p.save()
    .then(p => {
        console.log(p)
    })
    .catch(e => {
        console.log(e)
    });
