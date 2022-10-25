import { AdminForm } from "./AdminForm";
import { UserForm } from "./UserForm";

export const Profile = () => {
  const BookaholicUser = localStorage.getItem("bookaholic_user");
  const bookaholicUserObj = JSON.parse(BookaholicUser);

  if (bookaholicUserObj.isAddmin) {
    return <AdminForm />;
  } else {
    return <UserForm />;
  }
};
