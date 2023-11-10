import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Admin/Header/Header";
function AdminLayout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default AdminLayout;
