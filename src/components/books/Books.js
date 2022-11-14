import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useState } from "react";

export const Book = ({ book }) => {
  const navigate = useNavigate();
  const [canAddBook, setCanAddBook] = useState(true);
  const [currentlyReading, setCurrentlyReading] = useState([]);

  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  useEffect(() => {
    fetch(`http://localhost:8088/ownedBooks`)
      .then((response) => response.json())
      .then((OwnedBookArray) => {
        const foundBook = OwnedBookArray.find(
          (ownedBook) =>
            ownedBook.bookId === parseInt(book.id) &&
            bookaholicUserObj.id === ownedBook.userId
        );
        setCanAddBook(!foundBook);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/CurrentlyReadingBook`)
      .then((response) => response.json())
      .then((currentlyReadingArray) => {
        setCurrentlyReading(currentlyReadingArray);
      });
  }, []);

  const addBookToOwnedBooksButton = (event) => {
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
      body: JSON.stringify(newOwnedBook),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
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
            item.bookId === parseInt(book.id)
        );

        return fetch(`http://localhost:8088/ownedBooks/${foundOwnedBook.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foundOwnedBook),
        })
          .then((response) => response.json())
          .then(() => {
            window.location.reload();
          });
      });
  };

  const addtoCurrentlyReading = (event) => {
    event.preventDefault();
    const newOwnedBook = {
      bookId: book.id,
      userId: bookaholicUserObj.id,
      haveRead: false,
    };

    return fetch(`http://localhost:8088/CurrentlyReadingBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOwnedBook),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  const toggleBookRead = (event) => {
    event.preventDefault();
    return fetch(`http://localhost:8088/ownedBooks`)
      .then((response) => response.json())
      .then((data) => {
        const foundBook = data.find(
          (item) =>
            item.userId === bookaholicUserObj.id &&
            item.bookId === parseInt(book.id)
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
          .then((response) => {
            const checkCurrentlyReading = currentlyReading.find(
              (book) => book.bookId === response.bookId
            );
            if (checkCurrentlyReading) {
              const bookToReomve = {
                bookId: checkCurrentlyReading.bookId,
                userId: bookaholicUserObj.id,
              };
              return fetch(
                `http://localhost:8088/CurrentlyReadingBook/${checkCurrentlyReading.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bookToReomve),
                }
              );
            }
          })
          .then(() => window.location.reload());
      });
  };

  return (
    <Grid
      item
      component={Card}
      variant="outlined"
      className="book_image"
      xs={3}
    >
      <CardContent>
        <CardMedia
          height="450em"
          component="img"
          image={book.book.bookImage}
          alt={book.title}
        />
        <Typography variant="h4">{book.book.title}</Typography>
        <Typography variant="h5">{book.book.author}</Typography>
        <Typography variant="p">{book.book.bookSummary}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {canAddBook ? (
          <Tooltip title="add to owned books">
            <IconButton
              onClick={(clickEvent) => addBookToOwnedBooksButton(clickEvent)}
              aria-label="add to owned books"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="remove from owned books">
              <IconButton
                onClick={(clickEvent) => removeBookButton(clickEvent)}
                aria-label="add to owned books"
              >
                <FavoriteIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="add to read books">
              <IconButton
                onClick={(clickEvent) => toggleBookRead(clickEvent)}
                aria-label="share"
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="add to currently reading">
              <IconButton
                onClick={(clickEvent) => addtoCurrentlyReading(clickEvent)}
                aria-label="share"
              >
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Grid>
  );
};
