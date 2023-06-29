import { Request, Response } from 'express';
import BookModel from '../db/schemas/Book';

class BookController {
  async find(req: Request, res: Response) {
    try {
      const books = await BookModel.find();
      return res.json(books);
    } catch (error) {
      return res.status(500).json({
        error: 'Error finding books',
        message: error,
      });
    }
  }

  async create(req: Request, res: Response) {
    const { isbn } = req.params;

    // Search for the book using the Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await response.json();

    // Check if the API returned any results
    if (!data.items || data.items.length === 0) {
      res.status(404).send('Book not found');
      return;
    }

    // Extract the book information from the API response
    const bookInfo = data.items[0].volumeInfo;
    // Format the industryIdentifiers field as an array of strings
    const industryIdentifiers = bookInfo.industryIdentifiers.map(
      (identifier) => `${identifier.type}: ${identifier.identifier}`
    );

    // Check if a book with the same industryIdentifiers already exists in the database
    const existingBook = await BookModel.findOne({ industryIdentifiers });
    if (existingBook) {
      res.status(409).send('Book already exists');
      return;
    }

    // Create a new document using the Mongoose model and save it to the database
    const book = new BookModel({
      name: bookInfo.title,
      author: bookInfo.authors.join(', '),
      publisher: bookInfo.publisher,
      year: bookInfo.publishedDate,
      industryIdentifiers,
    });
    await book.save();

    res.json(book);
  }

  async createManually(req: Request, res: Response) {
    const { name, author, publisher, year, industryIdentifiers } = req.body;

    // Check if a book with the same industryIdentifiers already exists in the database
    const existingBook = await BookModel.findOne({ name })
    if (existingBook) {
      res.status(409).send('Book already exists');
      return;
    }

    // Create a new document using the Mongoose model and save it to the database
    const book = await BookModel.create({
      name,
      author,
      publisher,
      year,
      industryIdentifiers,
    });

    res.json(book);
  }
}

export default new BookController();
