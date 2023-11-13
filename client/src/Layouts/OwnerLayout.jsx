import React, { useState } from "react";
import OwnerHeader from "../components/Owner/OwnerHeader/OwnerHeader";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OwnerNav from "../components/Owner/OwnerNav/OwnerNav";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <OwnerNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <OwnerHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <ToastContainer />
            {/* <!-- ===== Header End ===== --> */}
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto my-16 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );
};

export default OwnerLayout;
