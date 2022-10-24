import { AddminViews } from "./AddminView";
import { UserViews } from "./UserView";

export const ApplicationViews = () => {
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    return <AddminViews />;
  } else {
    return <UserViews />;
  }
};
