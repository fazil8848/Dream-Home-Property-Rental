import React from "react";
import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import AdminLogin from "../../Pages/Admin/AdminLogin/AdminLogin";

export const UserRouter = () => {
  return (
    <>
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminHome />} />
      <Route path="login" element={<AdminLogin />} />
    </Route>
    </>
  );
};
