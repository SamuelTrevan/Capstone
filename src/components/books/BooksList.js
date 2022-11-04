import { useEffect, useState } from "react";
import { Book } from "./Books";

export const BooksList = ({ searchTermState, searchGenre }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/bookGenres?_expand=book&_expand=genre`)
      .then((response) => response.json())
      .then((bookArray) => {
        setBooks(bookArray);
      });
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    const searchedBooks = books.filter((book) => {
      if (
        book.book.title.toLowerCase().includes(searchTermState.toLowerCase())
      ) {
        return true;
      }
    });
    setFilteredBooks(searchedBooks);
  }, [searchTermState]);

  useEffect(() => {
    if (parseInt(searchGenre) === 0) {
      setFilteredBooks(books);
    } else {
      const searchedGenre = books.filter((book) => {
        if (book.genre?.id === parseInt(searchGenre)) {
          return true;
        }
      });
      setFilteredBooks(searchedGenre);
    }
  }, [searchGenre]);

  return (
    <div>
      {filteredBooks.map((book) => (
        <Book key={`book--${book.id}`} book={book} />
      ))}
    </div>
  );
};
