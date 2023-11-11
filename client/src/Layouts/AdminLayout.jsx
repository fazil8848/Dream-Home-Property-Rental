import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Admin/Header/Header";
import AdminNavbar from "../components/Admin/AdminNavbar/AdminNavbar";
function AdminLayout() {
  return (
    <div className=" overflow-hidden">
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
