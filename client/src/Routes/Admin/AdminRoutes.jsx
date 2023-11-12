import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import AdminLogin from "../../Pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "../../Layouts/AdminLayout";
import UserListing from "../../Pages/Admin/UserListing/UserListing";
import PrivateRoutes from "./Private/PrivateRoutes";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="login" element={<AdminLogin />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserListing />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
