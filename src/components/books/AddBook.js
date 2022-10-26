import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddBookForm = () => {
  const [genres, setgenre] = useState([]);
  const [userChoices, setUserChoices] = useState({
    author: "",
    title: "",
    genre: 0,
    bookSummary: "",
    bookImage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/genres`)
      .then((response) => response.json())
      .then((genreArray) => {
        setgenre(genreArray);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newBook = {
      author: userChoices.author,
      title: userChoices.title,
      genre: userChoices.genre,
      bookSummary: userChoices.bookSummary,
      bookImage: userChoices.bookImage,
    };
    if (
      userChoices.author &&
      userChoices.title &&
      userChoices.genre &&
      userChoices.bookSummary &&
      userChoices.bookImage
    ) {
      return fetch("http://localhost:8088/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      })
        .then((response) => response.json())
        .then((response) => {
          const newBookGenre = {
            bookId: response.id,
            genreId: parseInt(userChoices.genre),
          };
          return fetch("http://localhost:8088/bookGenres", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBookGenre),
          })
            .then((response) => response.json())
            .then(() => navigate("/books"));
        });
    } else {
      alert("Please Complete the entire Form");
    }
  };

  const handleInputChange = (event) => {
    const copy = { ...userChoices };
    copy[event.target.name] = event.target.value;
    setUserChoices(copy);
  };

  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            required
            autoFocus
            name="title"
            type="text"
            className="form-control"
            placeholder="Title of Book"
            value={userChoices.title}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="author">Author: </label>
          <input
            required
            autoFocus
            name="author"
            type="text"
            className="form-control"
            placeholder="Author of Book"
            value={userChoices.author}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="genre">Choose a genre: </label>
          <select
            required
            autoFocus
            name="genre"
            type="text"
            className="form-control"
            value={userChoices.genre}
            onChange={handleInputChange}
          >
            <option>Select Genre</option>;
            {genres.map((genre) => {
              {
                return <option value={genre.id}>{genre.name}</option>;
              }
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="summary">Summary: </label>
          <input
            required
            autoFocus
            name="bookSummary"
            type="text"
            className="form-control"
            placeholder="summary"
            value={userChoices.summary}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="summary">Book Image URL: </label>
          <input
            required
            autoFocus
            name="bookImage"
            type="text"
            className="form-control"
            placeholder="example.com"
            value={userChoices.image}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="submit_button"
      >
        {" "}
        Add New Book{" "}
      </button>
    </form>
  );
};
