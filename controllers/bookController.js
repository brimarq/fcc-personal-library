const Book = require('../models/book');

// for route 'api/books'

function getAllBooks(req, res) {

  // I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount. 
  // response will be array of book objects
  // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

  Book.find().lean().sort('comments').exec((err, books) => {
    if (err) res.send(err);
    const bookList = books.map(book => {
      const {_id, title, comments } = book;
      return { _id, title, commentcount: comments.length };
    });
    res.json(bookList);
  });
}

function addOneBook(req, res) {

  // I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id. 
  // response will contain new book object including at least _id and title 

  const book = new Book({ title: req.body.title });
  book.save((err, book) => {
    if (err) {
      if (err.name === "ValidationError") {
        return res.status(400).type('text').send('missing title');
      }
      return res.send(err);
    }
    const { _id, title, comments } = book;
    res.json({ _id, title, comments });
  });
}

function deleteAllBooks(req, res) {

  // I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful. 
  // if successful response will be 'complete delete successful' 

  Book.deleteMany(function (err) {
    if (err) return res.send(err);
    res.status(200).type('text').send('complete delete successful');
  });
}


// for route 'api/books/{_id}'

function getOneBook(req, res) {

  // I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present). 
  // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]} 

  Book.findById(req.params.id, 'title comments', function (err, doc) {
    if (err) {
      if (err.name === "CastError" && err.path === "_id") {
        return res.status(400).type('text').send('no book exists');
      }
      return res.send(err);
    }
    const {_id, title, comments} = doc;
    res.json({_id, title, comments});
  });
}

function addComment(req, res) {

  // I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}. 
  // json res format same as .get 

  const bookid = req.params.id;
  const comment = req.body.comment;
  Book.findOneAndUpdate({_id: {$eq: bookid}}, {$push: {comments: comment}}, {new: true}, (err, doc) => {
    if (err) {
      if (err.name === "CastError" && err.path === "_id") {
        return res.status(400).type('text').send('no book exists');
      }
      return res.send(err);
    }
    const {_id, title, comments} = doc;
    res.json({_id, title, comments});
  });
}

function deleteOneBook(req, res) {

  // I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful. 
  // if successful response will be 'delete successful' 

  Book.findOneAndDelete({_id: {$eq: req.params.id}}, function (err, doc) {
    if (err) {
      if (err.name === "CastError" && err.path === "_id") {
        return res.status(400).type('text').send('no book exists');
      }
      return res.send(err);
    }
    res.status(200).type('text').send('delete successful');
  });
}


module.exports = { getAllBooks, addOneBook, deleteAllBooks, getOneBook, addComment, deleteOneBook};