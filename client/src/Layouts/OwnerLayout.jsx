import React, { useState } from "react";
import OwnerHeader from "../components/Owner/OwnerHeader/OwnerHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwnerNav from "../components/Owner/OwnerNav/OwnerNav";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <OwnerNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <OwnerHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div
            className={`transition-margin duration-300 ${
              sidebarOpen ? "ml-64" : ""
            }`}
          >
            <ToastContainer />
            <main className="bg-gray-100">
              <div className="mx-auto my-16 max-w-screen-2xl p-4 md:p-6 2xl:px-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerLayout;
