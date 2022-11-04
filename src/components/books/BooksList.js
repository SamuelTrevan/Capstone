import { useEffect, useState } from "react";
import { Book } from "./Books";

export const BooksList = ({ searchTermState, searchGenre }) => {
  const [books, setBooks] = useState([]);
  const [bookgenres, setBookGenre] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/books`)
      .then((response) => response.json())
      .then((bookArray) => {
        setBooks(bookArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/bookGenres?_expand=book&_expand=genre`)
      .then((response) => response.json())
      .then((bookArray) => {
        setBookGenre(bookArray);
      });
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    const searchedBooks = books.filter((book) => {
      if (book.title.toLowerCase().startsWith(searchTermState.toLowerCase())) {
        return true;
      }
    });
    setFilteredBooks(searchedBooks);
  }, [searchTermState]);

  useEffect(() => {
    const searchedGenre = bookgenres.filter((bookGenre) => {
      if (bookGenre.genre?.id === parseInt(searchTermState)) {
        return true;
      }
    });
    setFilteredBooks(searchedGenre);
  }, [searchGenre]);

  return (
    <div>
      {filteredBooks.map((book) => (
        <Book key={`book--${book.id}`} book={book} />
      ))}
    </div>
  );
};
