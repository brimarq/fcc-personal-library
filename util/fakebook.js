const Book = require('../models/book');
const faker = require('faker/locale/en');

function titleCase(str) {
  return str.split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function makeTitle() {
  const title = faker.company.catchPhrase();
  return titleCase(title);
}

function makeComment() {
  return faker.hacker.phrase();
}

function makeBookObj(numComments) {
  const title = makeTitle(), 
  comments = [...Array(numComments)].map(e => makeComment());
  return {title, comments};
}

function populateBooks(numBooks = 7, maxNumCommentsEach = 4) {
  const booksArr = [...Array(numBooks)].map(e => makeBookObj(faker.random.number(maxNumCommentsEach)));
  return Book.create(booksArr, (err, books) => err ? err : console.log(`*** DB POPULATED WITH ${books.length} BOOKS`));
}

module.exports = { populateBooks };