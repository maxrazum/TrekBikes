const express = require('express');
const app = express();
const path = require('path');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/items', async (req, res) => {
    const items = await Item.find({})
    res.render('items/index', { items })
});

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id)
    res.render('items/show', { item })
});

app.listen(3000, () => {
    console.log("App is listening on port 3000")
});