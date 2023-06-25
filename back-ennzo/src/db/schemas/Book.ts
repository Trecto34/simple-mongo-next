import mongoose from 'mongoose';

interface Book {
  name: string;
  author: string;
  publisher: string;
  year: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
}

const bookSchema = new mongoose.Schema<Book>({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: String, required: true },
  industryIdentifiers: [
    {
      type: String,
      identifier: String,
    },
  ],
});

bookSchema.index({ industryIdentifiers: 1 }, { unique: true });

const BookModel = mongoose.model<Book>('Book', bookSchema);

export default BookModel;
