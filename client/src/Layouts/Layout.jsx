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
        <div className="fixed z-10">
          <Header />
          <ToastContainer />
        </div>
        <div className="pt-[3.8rem]">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
