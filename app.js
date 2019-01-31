const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = mongoose.connect('mongodb://localhost/bookapi')
const app = express()
const Books = require('./models/bookModel');
const bookRouter = require('./routes/bookRoutes')(Books)

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Welcome to my RESTAPi")
})


app.listen(port, () => {
    console.log(`Server is runing on ${port}`)
})

