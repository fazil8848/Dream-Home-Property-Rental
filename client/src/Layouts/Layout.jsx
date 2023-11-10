import React from "react";
import Header from "../components/User/Header/Header";
import Footer from "../components/User/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Layout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
