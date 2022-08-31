const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

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

app.get('/hello', (req, res) => {
    res.send('Hello World')
});

app.listen(3000, () => {
    console.log("App is listening on port 3000")
});