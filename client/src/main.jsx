import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./Redux/store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Layout from "./Layout.jsx";
import HomePage from "./Pages/User/HomePage/HomePage.jsx";
import LoginPage from "./Pages/User/LoginPage/LoginPage.jsx";
import SignupPage from "./Pages/User/SignupPage/SignupPage.jsx";
import AdminLayout from "./AdminLayout.jsx";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>
    </>
  )
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
