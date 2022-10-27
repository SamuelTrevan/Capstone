import { useEffect } from "react";

export const Library = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`   http://localhost:8088/users`)
      .then((response) => response.json())
      .then((profileArray) => {
        setProfile(profileArray);
      });
  }, []);

  return (
    <div>
      {profile.fullName}'s {profile.libraryName}
    </div>
  );
};
