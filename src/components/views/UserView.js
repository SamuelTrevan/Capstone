import { Outlet, Route, Routes } from "react-router-dom";
import { AddBookForm } from "../books/AddBook";
import { BookDetails } from "../books/BookDetails";
import { BooksList } from "../books/BooksList";
import { CurrentlyReading } from "../books/CurrentlyReadingBooks";
import { OwnedBooks } from "../books/ownedBooks";
import { ReadBooks } from "../books/ReadBooks";
import { Library } from "../Library.js/Library";
import { Profile } from "../profile/Profile";
export const UserViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Bookaholic</h1>
            <div>Your All In One Book Tracking Application</div>
            <Library />
            <OwnedBooks />
            <CurrentlyReading />

            <Outlet />
          </>
        }
      />

      <Route path="profile" element={<Profile />} />
      <Route path="readbooks" element={<ReadBooks />} />
      <Route path="books" element={<BooksList />} />
      <Route path="books/:bookId" element={<BookDetails />} />
      <Route path="books/create" element={<AddBookForm />} />
    </Routes>
  );
};
