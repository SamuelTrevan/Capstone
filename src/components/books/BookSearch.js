import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const BookSearch = ({
  setterFunction,
  setterSearchGenre,
  searchedGenre,
}) => {
  const [genres, setGenre] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/genres`)
      .then((response) => response.json())
      .then((genreArray) => {
        setGenre(genreArray);
      });
  }, []);

  return (
    <>
      <Grid container style={{ "margin-bottom": "2em" }}>
        <Grid style={{ "margin-right": "2em" }}>
          <TextField
            label="Enter book title here"
            onChange={(changeEvent) => {
              setterFunction(changeEvent.target.value);
            }}
            type="text"
            placeholder="Enter Book Title here"
          />
        </Grid>

        <Grid>
          <Select
            label="Genre"
            value={searchedGenre}
            onChange={(changeEvent) => {
              setterSearchGenre(changeEvent.target.value);
            }}
          >
            <MenuItem value={0}>Select Genre</MenuItem>;
            {genres.map((genre) => {
              {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </Grid>
      </Grid>
    </>
  );
};
