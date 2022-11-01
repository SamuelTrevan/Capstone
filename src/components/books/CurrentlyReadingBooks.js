import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CurrentlyReading = () => {
  const [currentlyReading, setcurrentlyReading] = useState([]);
  const [currentlyReadingBooks, setcurrentlyReadingBooks] = useState([]);

  const navigate = useNavigate();
  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  useEffect(() => {
    fetch(
      `http://localhost:8088/CurrentlyReadingBook?_expand=user&_expand=book`
    )
      .then((response) => response.json())
      .then((currentlyReadingArray) => {
        setcurrentlyReading(currentlyReadingArray);
      });
  }, []);

  useEffect(() => {
    const filteredCurrentlyReading = currentlyReading.filter(
      (book) => book?.user?.id === bookaholicUserObj.id
    );
    setcurrentlyReadingBooks(
      filteredCurrentlyReading.map((book) => {
        return book.book;
      })
    );
  }, [currentlyReading]);

  if (currentlyReadingBooks.length) {
    return (
      <>
        <div>
          <h2>Currently Reading Books</h2>
        </div>
        <div>
          {currentlyReadingBooks.map((b, idx) => {
            return (
              <div key={idx} onClick={() => navigate(`/books/${b.id}`)}>
                <img src={b.bookImage} alt={b.title} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};
