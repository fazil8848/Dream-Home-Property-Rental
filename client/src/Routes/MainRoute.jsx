import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "./Admin/AdminRoutes.jsx";
import UserRouter from "./User/UserRoutes.jsx";
import Verification from "../Pages/Verification/Verification.jsx";
import OwnerRoutes from "./Owner/OwnerRoutes.jsx";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/owner/*" element={<OwnerRoutes />} />
      <Route path="/*" element={<UserRouter />} />
      <Route path="/user/verifyUser/:id" element={<Verification />} />
    </Routes>
  );
};

export default MainRouter;

