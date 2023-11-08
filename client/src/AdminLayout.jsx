import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Admin/Header/Header";
import Footer from "./components/Admin/Footer/Footer";
function AdminLayout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
