const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {type: String, trim: true, required: true},
    comments: [String]
  }
);

module.exports = mongoose.model('Book', BookSchema);