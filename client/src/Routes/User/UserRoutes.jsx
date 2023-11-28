import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/User/HomePage/HomePage.jsx";
import LoginPage from "../../Pages/User/LoginPage/LoginPage.jsx";
import SignupPage from "../../Pages/User/SignupPage/SignupPage.jsx";
import Layout from "../../Layouts/Layout.jsx";
import PrivateRoutes from "./Private/PrivateRoutes.jsx";
import SinglePropertyPage from "../../Pages/User/SinglePropertyPage/SinglePropertyPage.jsx";
import UserProfilePage from "../../Pages/User/ProfilePage/ProfilePage.jsx";
import BookingPage from "../../Pages/User/BookingPage/BookingPage.jsx";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="property/:id" element={<SinglePropertyPage />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="profile" element={<UserProfilePage/>}/>
          <Route path="booking/:id" element={<BookingPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
