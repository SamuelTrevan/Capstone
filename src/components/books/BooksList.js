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
      <h1>All Books</h1>
      <button onClick={() => navigate("/books/create")}>Add Book</button>
      {books.map((book) => (
        <Book
          key={`book--${book.id}`}
          book={book}
          // id={book.id}
          // author={book.author}
          // title={book.title}
          // summary={book.bookSummary}
          // image={book.bookImage}
        />
      ))}
    </div>
  );
};
