import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBooks] = useState({});
  const [genres, setGenre] = useState([]);
  const [foundGenres, setFoundGenres] = useState([]);
  const [canAddBook, setCanAddBook] = useState(true);

  const navigate = useNavigate();
  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  useEffect(() => {
    fetch(`http://localhost:8088/ownedBooks`)
      .then((response) => response.json())
      .then((OwnedBookArray) => {
        const foundBook = OwnedBookArray.find(
          (ownedBook) =>
            ownedBook.bookId === parseInt(bookId) &&
            bookaholicUserObj.id === ownedBook.userId
        );
        setCanAddBook(!foundBook);
      });
  }, []);

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

  const addBookButton = (event) => {
    event.preventDefault();
    const newOwnedBook = {
      bookId: book.id,
      userId: bookaholicUserObj.id,
      haveRead: false,
    };

    return fetch(`http://localhost:8088/ownedBooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOwnedBook), //need to add the book
    })
      .then((response) => response.json())
      .then(() => {
        alert("Book Added to Owned Books");
        navigate("/");
      });
  };

  const removeBookButton = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8088/ownedBooks`)
      .then((response) => response.json())
      .then((data) => {
        const foundOwnedBook = data.find(
          (item) =>
            item.userId === bookaholicUserObj.id &&
            item.bookId === parseInt(bookId)
        );

        return fetch(`http://localhost:8088/ownedBooks/${foundOwnedBook.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foundOwnedBook), //need to add the book
        })
          .then((response) => response.json())
          .then(() => {
            alert("Book Removed from Owned Books");
            navigate("/");
          });
      });
  };

  const toggleBookRead = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8088/ownedBooks`)
      .then((response) => response.json())
      .then((data) => {
        const foundBook = data.find(
          (item) =>
            item.userId === bookaholicUserObj.id &&
            item.bookId === parseInt(bookId)
        );
        const ownedBook = {
          bookId: foundBook.bookId,
          userId: foundBook.userId,
          haveRead: !foundBook.haveRead,
          id: foundBook.id,
        };
        return fetch(`http://localhost:8088/ownedBooks/${ownedBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ownedBook),
        })
          .then((response) => response.json())
          .then(() => {
            alert("Updated Read Books");
          });
      });
  };

  return (
    <div className="book">
      {canAddBook ? (
        <button onClick={(clickEvent) => addBookButton(clickEvent)}>
          Add to Owned Books
        </button>
      ) : (
        <>
          <button onClick={(clickEvent) => removeBookButton(clickEvent)}>
            Remove From Owned Books
          </button>
          <button onClick={(clickEvent) => toggleBookRead(clickEvent)}>
            Toggle Read
          </button>
        </>
      )}

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

/* line 44 g is foundGenre (singular) and idx is the index position of the singular item.
 */
