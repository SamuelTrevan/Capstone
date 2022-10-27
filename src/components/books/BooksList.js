import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "./Books";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/books`)
      .then((response) => response.json())
      .then((bookArray) => {
        setBooks(bookArray);
      });
  }, []);

  return (
    <div>
      <h1>Master Library</h1>
      <button onClick={() => navigate("/books/create")}>
        Add Book to Master Library
      </button>
      {books.map((book) => (
        <Book key={`book--${book.id}`} book={book} />
      ))}
    </div>
  );
};
