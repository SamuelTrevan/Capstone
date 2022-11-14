import { Grid } from "@mui/material";
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
    const searchedByTitle = books.filter((book) => {
      if (
        book.book.title.toLowerCase().includes(searchTermState.toLowerCase())
      ) {
        return true;
      }
    });
    if (parseInt(searchGenre) === 0) {
      setFilteredBooks(searchedByTitle);
    } else {
      const searchedGenre = searchedByTitle.filter((book) => {
        if (book.genre?.id === parseInt(searchGenre)) {
          return true;
        }
      });
      setFilteredBooks(searchedGenre);
    }
  }, [searchTermState, searchGenre]);

  return (
    <Grid container>
      {filteredBooks.map((book) => (
        <Book key={`book--${book.id}`} book={book} />
      ))}
    </Grid>
  );
};
