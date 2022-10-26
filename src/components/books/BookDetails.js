import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBooks] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8088/books?id=${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        const singleBook = data[0];
        setBooks(singleBook);
      });
  }, [bookId]);

  return (
    <div className="book">
      <header className="book-header">{book.title}</header>
      <div>Author: {book.title}</div>
      <div>Summary: {book.bookSummary}</div>
      <div>Genre: {}</div>
    </div>
  );
};
