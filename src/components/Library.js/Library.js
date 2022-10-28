import { useEffect, useState } from "react";

export const Library = () => {
  const [profile, setProfile] = useState([]);

  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  useEffect(() => {
    fetch(`http://localhost:8088/users`)
      .then((response) => response.json())
      .then((profileArray) => {
        const foundUser = profileArray.find(
          (user) => user.id === bookaholicUserObj.id
        );
        setProfile(foundUser);
      });
  }, []);

  return (
    <div>
      {profile.fullName}'s{" "}
      {profile.libraryName ? profile.libraryName : "Library"}
    </div>
  );
};
