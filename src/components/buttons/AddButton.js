import { useEffect, useState } from "react";

export const AddButton = () => {
  const [newbook, setNewBook] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/ownedBooks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(), //need to add the book
    })
      .then((response) => response.json())
      .then(() => {
        alert("Book Added to Owned Books");
      });
  });
};
