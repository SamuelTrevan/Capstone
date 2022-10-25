import { AddminViews } from "./AddminView";
import { UserViews } from "./UserView";

export const ApplicationViews = () => {
  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  if (bookaholicUserObj.isAdmin) {
    return <AddminViews />;
  } else {
    return <UserViews />;
  }
};
