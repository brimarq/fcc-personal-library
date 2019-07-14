const faker = require('faker/locale/en');

function titleCase(str) {
  return str.split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

exports.title = function () {
  const title = faker.company.catchPhrase();
  return titleCase(title);
}

exports.comment = function () {
  return faker.hacker.phrase();
}