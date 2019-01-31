/* eslint-disable no-param-reassign */
/* eslint linebreak-style: ["error", "windows"] */

const express = require('express')

function routes(Books) {
    const bookRouter = express.Router()
    bookRouter.route('/book')
  .post((req, res) => {
    const book = new Books(req.body);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre
    }
      Books.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
bookRouter.use('/book/:bookId', (req, res, next) => {
    Books.findById(req.params.bookId, (err, book) => {
        if (err) {
            return res.send(err)
        }
        return res.json(book)
    })
})

bookRouter.route('/book/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
            const { book } = req;
            console.log(req.body)
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save()
            return res.json(book)
    })

return bookRouter;
}

module.exports = routes