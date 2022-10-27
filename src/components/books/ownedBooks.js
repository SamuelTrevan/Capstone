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
            <>
              <div key={idx}>{b.title}</div>
              {/* <button>Remove Book</button> */}
            </>
          );
        })}
      </div>
    </>
  );
  /*
  I need to get the list of owned books.
  I need to compare the userId on the owned books to the user that is logged in
  I need to display the title of the owned books for the current user that is logged in 
  */
};
