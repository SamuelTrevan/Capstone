import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const OwnedBooks = () => {
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [filteredOwnedBooks, setFilteredOwnedBooks] = useState([]);

  const navigate = useNavigate();

  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  useEffect(() => {
    fetch(`http://localhost:8088/ownedBooks?_expand=user&_expand=book`)
      .then((response) => response.json())
      .then((ownedBooksArray) => {
        setOwnedBooks(ownedBooksArray);
      });
  }, []);

  useEffect(() => {
    const filteredOwnedBooks = ownedBooks.filter(
      (ownedBook) => ownedBook.userId === bookaholicUserObj.id
    );
    setFilteredOwnedBooks(
      filteredOwnedBooks.map((filteredOwnedBook) => {
        return filteredOwnedBook.book;
      })
    );
  }, [ownedBooks]);

  return (
    <>
      <div>
        <h2>Owned Books</h2>
      </div>
      <div>
        <button onClick={() => navigate("/books")}>Add New Owned Book</button>
        {filteredOwnedBooks.map((b, idx) => {
          return (
            <div
              className="book_image"
              key={idx}
              onClick={() => navigate(`/books/${b.id}`)}
            >
              <img src={b.bookImage} alt={b.title} />
            </div>
          );
        })}
      </div>
    </>
  );
};
