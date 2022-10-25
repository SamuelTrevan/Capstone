import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      {books.map((book) => {
        return (
          <div key={book.id} className="book_image" onClick={() => {}}>
            <img src={book.bookImage} alt={book.title} />
          </div>
        );
      })}
    </div>
  );
};
