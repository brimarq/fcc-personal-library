const Book = require('../models/book');

// for route 'api/books'

exports.books_all_list = function (req, res) {
  // I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount. 
  // response will be array of book objects
  // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  res.send('NOT IMPLEMENTED: Books all list GET');
}

exports.book_add = function (req, res) {
  // I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id. 
  // response will contain new book object including atleast _id and title 
  const title = req.body.title;
  res.send('NOT IMPLEMENTED: Book add POST');
}

exports.books_all_delete = function (req, res) {
  // I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful. 
  // if successful response will be 'complete delete successful' 
  res.send('NOT IMPLEMENTED: Books all DELETE');
}

// for route 'api/books/{_id}'

exports.book_detail = function (req, res) {
  // I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present). 
  // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]} 
  const bookid = req.params.id;
  res.send('NOT IMPLEMENTED: Book detail GET');
}

exports.book_comment_add = function (req, res) {
  // I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}. 
  // json res format same as .get  
  const bookid = req.params.id;
  const comment = req.body.comment;
  res.send('NOT IMPLEMENTED: Book add comment POST');
}

exports.book_delete = function (req, res) {
  // I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful. 
  // if successful response will be 'delete successful' 
  const bookid = req.params.id;
  res.send('NOT IMPLEMENTED: Book DELETE');
}

