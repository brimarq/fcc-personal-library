/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
const Book = require('../models/book');
const fakebook = require('../util/fakebook');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  const testBookTitle = 'Test Book'; 

  suiteSetup(async function () {
    
    try {

      const booksCount = await Book.estimatedDocumentCount();
      if (booksCount) return;
      fakebook.populateBooks();

    } catch(err) {
      throw err;
    }    

  });

  suiteTeardown(function () {
    Book.deleteMany({title: {$eq: testBookTitle}}, err => {if (err) {throw err;}});
  });
  

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
    chai.request(server)
    .get('/api/books')
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.isArray(res.body, 'response should be an array');
      assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
      assert.property(res.body[0], 'title', 'Books in array should contain title');
      assert.property(res.body[0], '_id', 'Books in array should contain _id');
      done();
    });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    let testBookId;

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: testBookTitle})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'Response body should be an object');
          assert.property(res.body, '_id', 'Book should contain _id');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.equal(res.body.title, testBookTitle);
          assert.property(res.body, 'comments', 'Book should contain comments');
          assert.isArray(res.body.comments, 'Comments should be an array');
          testBookId = res.body._id;
          done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: " "})
        .end(function(err, res){ 
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing title');                        
          done();
        });
      });
      
    });

    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response body should be an array');
          assert.property(res.body[0], '_id', 'Books in array should contain _id'); 
          assert.property(res.body[0], 'title', 'Books in array should contain title'); 
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount'); 
          assert.isNumber(res.body[0].commentcount, 'commentcount should should be typeof Number');
          done();
        });
      });      
      
    });

    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/1234')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');                          
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .get(`/api/books/${testBookId}`)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, '_id', 'Books in array should contain _id'); 
          assert.equal(res.body._id, testBookId); 
          assert.property(res.body, 'title', 'Books in array should contain title');
          assert.property(res.body, 'comments', 'Books in array should contain comments');
          assert.isArray(res.body.comments, 'Comments should be an array'); 
          done();
        });
      });
      
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done) {
        const comment = 'Test comment.';
        chai.request(server)
        .post(`/api/books/${testBookId}`)
        .send({comment})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, '_id', 'Book should contain _id'); 
          assert.property(res.body, 'title', 'Book should contain title');
          assert.property(res.body, 'comments', 'Book should contain comments');
          assert.containsAllKeys(res.body, ['_id', 'title', 'comments'], 'Book should contain _id, title, and comments');
          assert.isArray(res.body.comments, 'Comments should be an array'); 
          assert.include(res.body.comments, comment, 'Comments should include submitted comment');           
          done();
        });
      });
      
    });

  });

});
