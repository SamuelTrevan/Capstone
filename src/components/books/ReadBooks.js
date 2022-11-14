import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Book } from "./Books";

export const ReadBooks = () => {
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [filteredReadBooks, setFilteredReadBooks] = useState([]);

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
    const filteredReadBooks = ownedBooks.filter(
      (ownedBook) =>
        ownedBook.userId === bookaholicUserObj.id && ownedBook.haveRead
    );
    setFilteredReadBooks(
      filteredReadBooks.map((filteredReadBook) => {
        return filteredReadBook;
      })
    );
  }, [ownedBooks]);

  return (
    <>
      <div>
        <h2>Read Books</h2>
      </div>
      <Grid container>
        {filteredReadBooks.map((b, idx) => {
          return <Book book={b} key={idx} />;
        })}
      </Grid>
    </>
  );
};

// {filteredReadBooks.map((b, idx) => {
//   return (
//     <div key={idx}>
//       <img src={b.bookImage} alt={b.title} />
//     </div>
//   );
// })}
