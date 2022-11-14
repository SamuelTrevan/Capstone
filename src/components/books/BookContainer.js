import { Button, Divider, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookSearch } from "./BookSearch";
import { BooksList } from "./BooksList";

export const BookContainer = () => {
  const [searTerms, setSearchTerms] = useState("");
  const [searchGenre, setSearchGenre] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Master Library</h1>
        <Grid container direction="row">
          <Grid item xs={3}>
            <Button
              style={{ "margin-bottom": "2em" }}
              variant="contained"
              onClick={() => navigate("/books/create")}
            >
              Add Book to Master Library
            </Button>
          </Grid>
          <Grid item xs={9} />
          <Divider />
          <BookSearch
            setterFunction={setSearchTerms}
            setterSearchGenre={setSearchGenre}
            searchedGenre={searchGenre}
          />
        </Grid>
        <BooksList searchTermState={searTerms} searchGenre={searchGenre} />
      </div>
    </>
  );
};
