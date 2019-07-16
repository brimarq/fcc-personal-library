const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {type: String, trim: true, required: true},
    comments: [String]
  }
);

BookSchema.virtual('commentcount').get(function() {
  return this.comments.length;
});

module.exports = mongoose.model('Book', BookSchema);