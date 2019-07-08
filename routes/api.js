/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
const bookController = require('../controllers/bookController');
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(bookController.books_all_list)
    .post(bookController.book_add)
    .delete(bookController.books_all_delete);

  app.route('/api/books/:id')
    .get(bookController.book_detail)
    .post(bookController.book_comment_add)
    .delete(bookController.book_delete);
  
};
