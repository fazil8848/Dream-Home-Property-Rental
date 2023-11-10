import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import AdminLogin from "../../Pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "../../Layouts/AdminLayout";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
