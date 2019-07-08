const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {type: String, required: true},
    comments: [{type: String}]
  }
);

BookSchema
.virtual('commentcount')
.get(function () {
  return this.comments.length;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);