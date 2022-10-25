import { Link, useNavigate } from "react-router-dom";

export const UserNav = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/profile">
          Profile
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/readbooks">
          Read Books
        </Link>
      </li>
      {localStorage.getItem("bookaholic_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("bookaholic_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
