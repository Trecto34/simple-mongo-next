import { useState } from 'react';
import styles from '../../styles/AddBook.module.css';

export default function AddBook() {
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/books/${isbn}`);
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setMessage('Livro adicionado com sucesso');
      } else {
        setMessage('Erro ao adicionar livro');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao buscar livro');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Livro</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="isbn" className={styles['label-text']}>
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={handleChange}
            className={styles['text-input']}
          />
        </div>
        <button type="submit" className={styles['submit-button']}>
          Adicionar Livro
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
