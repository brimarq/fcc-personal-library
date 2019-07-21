const Book = require('../models/book');
 
function createBookObj(book, inclComments = true) { 
  const bookObj = inclComments 
    ? (({_id, title, comments} = book) => ({_id, title, comments}))()
    : (({_id, title, comments} = book) => ({_id, title, commentcount: comments.length}))();
  return bookObj;
}

// FOR ROUTE 'api/books' //

function getAllBooks(req, res) {

  // I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount. Response will be array of book objects with json format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

  Book.find({}, 'title comments', {lean: true }, (err, books) => {
    if (err) { throw err }
    res.send(books.map(book => createBookObj(book, false))
    );
  });
}

function addOneBook(req, res) {

  // I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id. 
  // response will contain new book object including at least _id and title 

  const newBook = new Book({ title: req.body.title });
  newBook.save((err, book) => {
    if (err) {
      if (err.name === "ValidationError") {
        res.send('missing title');
      } else { throw err }
    } else if (book) {
      res.send(createBookObj(book));
    } 
  });
}

function deleteAllBooks(req, res) {

  // I can send a delete request to /api/books to delete all books in the database. If successful response will be 'complete delete successful' 

  Book.deleteMany(err => {
    if (err) { throw err }
    res.send('complete delete successful')
  })
}


// FOR ROUTE 'api/books/{_id}' //

function getOneBook(req, res) {

  // I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present). Json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]} 
  
  Book.findById(req.params.id, 'title comments', { lean: true }, (err, book) => {
    if (err) {
      if (err.name === "CastError") {
        res.send('no book exists');
      } else { throw err }
    }
    if (book) {
      res.send(createBookObj(book));
    }
  });

}

function addComment(req, res) {

  // I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}. Json res format same as .get 

  const bookid = req.params.id;
  const comment = req.body.comment;

  Book.findOneAndUpdate({_id: {$eq: bookid}}, {$push: {comments: comment}}, {new: true}, (err, book) => {
    if (err) {
      if (err.name === "CastError") {
        res.send('no book exists');
      } else { throw err }
    }
    if (book) {
      res.send(createBookObj(book));
    }
  });

}

function deleteOneBook(req, res) {

  // I can delete /api/books/{_id} to delete a book from the collection. If successful, response will be 'delete successful' 

  Book.findOneAndDelete({_id: {$eq: req.params.id}}, (err, book) => {
    if (err) {
      if (err.name === "CastError") {
        res.send('no book exists');
      } else { throw err }
    }
    if (book) {
      res.send('delete successful');
    }
  });
  
}

module.exports = { getAllBooks, addOneBook, deleteAllBooks, getOneBook, addComment, deleteOneBook};