const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter book title"],
    },
    author: {
      type: String,
      required: [true, "Please enter author"],
    },
    publishYear: {
      type: Number,
      required: [true, "Please enter publish year"],
    },
    
  },
  //two more fields for createdAt and updatedAt
  {
    timestamps: true,
  }
);

const Book= mongoose.model("Book", BookSchema);

module.exports = Book;