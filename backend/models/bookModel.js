import mongoose from 'mongoose';

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

export const Book= mongoose.model("Book", BookSchema);