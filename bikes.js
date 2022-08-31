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

// const p = new Item({
//     name: 'FX 3',
//     price: 1149.99,
//     category: 'hybrid'
// });

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     });

const bikeItems = [
    {
        name: 'Fuel Exe 9.5',
        price: 8399.99,
        category: 'mountain'
    },
    {
        name: 'Fuel Exe 9.7',
        price: 9399.99,
        category: 'mountain'
    },
    {
        name: 'Fuel Exe 9.8 XT',
        price: 11199.99,
        category: 'mountain'
    },
    {
        name: 'Fuel Exe 9.8 GX AXS',
        price: 14199.99,
        category: 'mountain'
    },
    {
        name: 'Fuel Exe 9.9 XTR',
        price: 16799.99,
        category: 'mountain'
    },
    {
        name: 'Fuel Exe 9.9 XX1 AXS',
        price: 18299.99,
        category: 'mountain'
    },
    {
        name: 'FX+ 2',
        price: 3199.99,
        category: 'hybrid'
    },
    {
        name: 'Kakau Go!',
        price: 2349.99,
        category: 'hybrid'
    },
    {
        name: 'Dual Sport+ 2',
        price: 3049.99,
        category: 'hybrid'
    },
    {
        name: 'Townie Original 7D EQ Step-Over',
        price: 909.99,
        category: 'hybrid'
    },
    {
        name: 'Townie Original 7D Step-Over',
        price: 779.99,
        category: 'hybrid'
    },
    {
        name: 'FX 1',
        price: 689.99,
        category: 'hybrid'
    },
    {
        name: 'Madone SLR 9 eTap Gen 7',
        price: 17749.99,
        category: 'road'
    },
    {
        name: 'Madone SLR 7 eTap Gen 7',
        price: 11949.99,
        category: 'road'
    },
    {
        name: 'Madone SLR 6 eTap Gen 7',
        price: 10549.99,
        category: 'road'
    },
    {
        name: 'Emonda SLR 9 eTap',
        price: 17349.99,
        category: 'road'
    },
    {
        name: 'Emonda SLR 7 eTap',
        price: 11899.99,
        category: 'road'
    },
    {
        name: 'Emonda SLR 6 eTap',
        price: 9899.99,
        category: 'road'
    },
    {
        name: 'Domane AL 4 Disc',
        price: 2229.99,
        category: 'road'
    },
    {
        name: 'Domane AL 3 Disc',
        price: 1799.99,
        category: 'road'
    },
    {
        name: 'Domane AL 2 Disc',
        price: 1499.99,
        category: 'road'
    },
]

Item.insertMany(bikeItems)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    });
