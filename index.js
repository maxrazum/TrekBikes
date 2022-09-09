const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

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
app.use(express.static('views'));

const categories = ['mountain', 'hybrid', 'road'];

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/items', wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if(category){
        const items = await Item.find({ category })
        res.render('items/index', { items, category })
    } else {
        const items = await Item.find({})
        res.render('items/index', { items, category: 'All' })
    }
}));

app.get('/items/new', (req, res) => {
    res.render('items/new', { categories })
});

app.post('/items', wrapAsync(async (req, res, next) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect(`/items/${newItem._id}`)
}));

app.get('/items/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('items/show', { item })
}));

app.get('/items/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findById(id)
    if (!item) {
        throw new AppError('Item Not Found', 404);
    }
    res.render('items/edit', { item, categories })
}));

app.put('/items/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/items/${item._id}`);
}));

app.delete('/items/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items')
}));

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
});