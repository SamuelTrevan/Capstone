import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserForm = () => {
  const [profile, updateProfile] = useState({
    fullName: "",
    email: "",
    libraryName: "",
    isAdmin: false,
    id: 0,
  });

  const navigate = useNavigate();

  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback !== "") {
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);

  useEffect(() => {
    fetch(`http://localhost:8088/users?id=${bookaholicUserObj.id}`)
      .then((response) => response.json())
      .then((data) => {
        const userObject = data[0];
        updateProfile(userObject);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    return fetch(`http://localhost:8088/users/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <div
        className={`${feedback.includes("Error") ? "error" : "feedback"} ${
          feedback === "" ? "invisible" : "visible"
        }`}
      >
        {feedback}
      </div>
      <form className="profile">
        <h2 className="profile__title">Update Profile</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={profile.fullName}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.fullName = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="form-control"
              value={profile.email}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.email = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="libraryName">Library Name:</label>
            <input
              type="text"
              className="form-control"
              value={profile.libraryName}
              onChange={(evt) => {
                const copy = { ...profile };
                copy.libraryName = evt.target.value;
                updateProfile(copy);
              }}
            />
          </div>
        </fieldset>
        <Button
          style={{ marginTop: "2em" }}
          variant="contained"
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Save Profile
        </Button>
      </form>
    </>
  );
};
