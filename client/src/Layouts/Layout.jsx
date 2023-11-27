import React from "react";
import Header from "../components/User/Header/Header";
import Footer from "../components/User/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
  return (
    <>
      <div>
        <div className="fixed z-10 top-0 left-0">
          <Header />
          <ToastContainer />
        </div>
        <div className="pt-[3.8rem] min-h-[50vh]">
          <Outlet />
        </div>
          <div className=""><Footer /></div>
      </div>
    </>
  );
}

export default Layout;
