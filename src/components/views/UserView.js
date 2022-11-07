import { Outlet, Route, Routes } from "react-router-dom";
import { AddBookForm } from "../books/AddBook";
import { BookContainer } from "../books/BookContainer";
import { BookDetails } from "../books/BookDetails";
import { CurrentlyReading } from "../books/CurrentlyReadingBooks";
import { OwnedBooks } from "../books/ownedBooks";
import { ReadBooks } from "../books/ReadBooks";
// import { WantToRead } from "../books/WantToRead";
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
      {/* <Route path="wanttoread" element={<WantToRead />} /> */}
      <Route path="books" element={<BookContainer />} />
      <Route path="books/:bookId" element={<BookDetails />} />
      <Route path="books/create" element={<AddBookForm />} />
    </Routes>
  );
};
