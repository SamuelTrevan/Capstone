import { Outlet, Route, Routes } from "react-router-dom";

export const AddminViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Bookaholic</h1>
            <div>Your All In One Book Tracking Application</div>

            <Outlet />
          </>
        }
      ></Route>
    </Routes>
  );
};
