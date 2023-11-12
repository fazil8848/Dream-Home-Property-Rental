import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/User/HomePage/HomePage.jsx";
import LoginPage from "../../Pages/User/LoginPage/LoginPage.jsx";
import SignupPage from "../../Pages/User/SignupPage/SignupPage.jsx";
import Layout from "../../Layouts/Layout.jsx";
import PrivateRoutes from "./Private/PrivateRoutes.jsx";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="" element={<PrivateRoutes />}>
          <></>
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;