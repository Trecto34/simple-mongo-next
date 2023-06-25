
import { useEffect, useState } from 'react';
import styles from "../../styles/BooksPage.module.css"

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

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3001/books/');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Livros Cadastrados:</h1>
      {books.map((book) => (
        <div key={book.industryIdentifiers[0].identifier} className={styles.card}>
          <h2>{book.name}</h2>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.year}</p>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;
