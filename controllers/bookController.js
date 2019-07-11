const Book = require('../models/book');

// for route 'api/books'

exports.books_all_list = function (req, res, next) {
  // I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount. 
  // response will be array of book objects
  // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  Book.find((err, docArr) => {
    if (err) return next(err);
    const books = docArr.map(book => {
      const {_id, title, comments} = book;
      return { _id, title, commentcount: comments.length };
    });
    res.json(books);
  });
}

exports.book_add = function (req, res, next) {
  // I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id. 
  // response will contain new book object including at least _id and title 
  const title = req.body.title;
  const book = new Book({ title });
  book.save((err, book) => {
    if (err) return next(err);
    const { _id, title } = book;
    res.json({ _id, title });
  });
}

exports.books_all_delete = function (req, res, next) {
  // I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful. 
  // if successful response will be 'complete delete successful' 
  Book.deleteMany(function (err) {
    if (err) return next(err);
    res.send('complete delete successful');
  });
}

// for route 'api/books/{_id}'

exports.book_detail = function (req, res, next) {
  // I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present). 
  // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]} 
  const bookid = req.params.id;
  Book.findById(bookid, 'title comments', function (err, doc) {
    if (err) return next(err);
    const {_id, title, comments} = doc;
    res.json({_id, title, comments});
  });
  // TODO: deal with CastError from invalid _id sent
}

exports.book_comment_add = function (req, res, next) {
  // I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}. 
  // json res format same as .get  
  const bookid = req.params.id;
  const comment = req.body.comment;
  Book.findOneAndUpdate({_id: {$eq: bookid}}, {$push: {comments: comment}}, {new: true}, (err, doc) => {
    if (err) return next(err);
    const {_id, title, comments} = doc;
    res.json({_id, title, comments});
  });
  // TODO: deal with CastError from invalid _id sent
}

exports.book_delete = function (req, res, next) {
  // I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful. 
  // if successful response will be 'delete successful' 
  const bookid = req.params.id;
  Book.findOneAndDelete({_id: {$eq: bookid}}, function (err, doc) {
    if (err) return next(err);
    res.send('delete successful');
  });
  // TODO: deal with CastError from invalid _id sent
}

