import React from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Footer from "../Footer/Footer";

function Dashboard() {
  return (
    <>
      <div className=" flex w-full h-full bg-gray-200">
        <AdminNavbar />
        <h1 className=" mx-auto text-3xl text-blue-100 ">Admin Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;
