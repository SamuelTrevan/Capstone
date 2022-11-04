import { useEffect, useState } from "react";

export const BookSearch = ({ setterFunction, setterSearchGenre }) => {
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
      <div>
        <input
          onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value);
          }}
          type="text"
          placeholder="Enter Book Tilte here"
        />
      </div>

      <div>
        <select
          onChange={(changeEvent) => {
            setterSearchGenre(changeEvent.target.value);
          }}
        >
          <option value={0}>Select Genre</option>;
          {genres.map((genre) => {
            {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            }
          })}
        </select>
      </div>
    </>
  );
};
