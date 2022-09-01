const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/trekBikes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection open")
    })
    .catch(err => {
        console.log("Mongo connection error")
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

const categories = ['mountain', 'hybrid', 'road'];

app.get('/items', async (req, res) => {
    const items = await Item.find({})
    res.render('items/index', { items })
});

app.get('/items/new', (req, res) => {
    res.render('items/new', { categories })
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect(`/items/${newItem._id}`)
});

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id)
    res.render('items/show', { item })
});

app.get('/items/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', { item, categories })
});

app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/items/${item._id}`);
});

app.listen(3000, () => {
    console.log("App is listening on port 3000")
});