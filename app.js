const express = require('express')
const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost/bookapi')
const bookRouter = express.Router()
const app = express()
const Books = require('./models/bookModel')

bookRouter.route('/book')
    .get((req, res) => {
        Books.find((err, books) => {
            if(err) {
                return res.send(err)
            }
            return res.json(books)
        })
    })

app.use('/api', bookRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Welcome to my RESTAPi")
})


app.listen(port, () => {
    console.log(`Server is runing on ${port}`)
})

