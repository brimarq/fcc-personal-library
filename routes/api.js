/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const bookController = require('../controllers/bookController');

module.exports = function (app) {

  app.route('/api/books')
    .get(bookController.getAllBooks)
    .post(bookController.addOneBook)
    .delete(bookController.deleteAllBooks);

  app.route('/api/books/:id')
    .get(bookController.getOneBook)
    .post(bookController.addComment)
    .delete(bookController.deleteOneBook);
  
};
