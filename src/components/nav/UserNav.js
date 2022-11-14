import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const UserNav = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookaholic
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="readbooks">
            Read Books
          </Button>
          <Button color="inherit" href="profile">
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("bookaholic_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

// import { Link, useNavigate } from "react-router-dom";

// export const UserNav = () => {
//   const navigate = useNavigate();

//   return (
//     <ul className="navbar">
//       <li className="navbar__item active">
//         <Link className="navbar__link" to="">
//           Home
//         </Link>
//       </li>
//       <li className="navbar__item active">
//         <Link className="navbar__link" to="profile">
//           Profile
//         </Link>
//       </li>
//       <li className="navbar__item active">
//         <Link className="navbar__link" to="readbooks">
//           Read Books
//         </Link>
//       </li>
//       {localStorage.getItem("bookaholic_user") ? (
//         <li className="navbar__item navbar__logout">
//           <Link
//             className="navbar__link"
//             to=""
//             onClick={() => {
//               localStorage.removeItem("bookaholic_user");
//               navigate("/", { replace: true });
//             }}
//           >
//             Logout
//           </Link>
//         </li>
//       ) : (
//         ""
//       )}
//     </ul>
//   );
// };
