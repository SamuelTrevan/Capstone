import { useNavigate } from "react-router-dom";
import { AddminNav } from "./AddminNav";
import { UserNav } from "./UserNav";

export const NavBar = () => {
  const navigate = useNavigate();

  const localBookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(localBookaholicUser);

  if (bookaholicUserObj.staff) {
    return <AddminNav />;
  } else {
    return <UserNav />;
  }
};
