import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookSearch } from "./BookSearch";
import { BooksList } from "./BooksList";

export const BookContainer = () => {
  const [searTerms, setSearchTerms] = useState("");
  const [searchGenre, setSearchGenre] = useState();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Master Library</h1>
        <button onClick={() => navigate("/books/create")}>
          Add Book to Master Library
        </button>
        <BookSearch
          setterFunction={setSearchTerms}
          setterSearchGenre={setSearchGenre}
        />
        <BooksList searchTermState={searTerms} searchGenre={searchGenre} />
      </div>
    </>
  );
};
