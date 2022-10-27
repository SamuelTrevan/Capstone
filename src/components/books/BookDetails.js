import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBooks] = useState({});
  const [genres, setGenre] = useState([]);
  const [foundGenres, setFoundGenres] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/books?id=${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        const singleBook = data[0];
        setBooks(singleBook);
      });
  }, [bookId]);

  useEffect(() => {
    fetch(`http://localhost:8088/bookGenres?_expand=book&_expand=genre`)
      .then((response) => response.json())
      .then((data) => {
        const genreArray = data;
        setGenre(genreArray);
      });
  }, []);

  useEffect(() => {
    const filteredGenres = genres.filter((genre) => genre.bookId === book.id);
    setFoundGenres(
      filteredGenres.map((filteredGenre) => {
        return filteredGenre?.genre?.name;
      })
    );
  }, [book, genres]);

  return (
    <div className="book">
      <button>Add to Owned Books</button>
      <header className="book-header">{book.title}</header>
      <div>Author: {book.author}</div>
      <div>Summary: {book.bookSummary}</div>
      <div>
        Genre:{" "}
        {foundGenres.map((g, idx) => {
          return <div key={idx}>{g}</div>;
        })}
      </div>
    </div>
  );
};

// line 44 g is foundGenre (singular) and idx is the index position of the singular item.
