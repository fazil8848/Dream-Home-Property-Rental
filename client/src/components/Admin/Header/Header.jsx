import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { adminLogout } from "../../../Redux/Slices/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAdminLogoutMutation } from "../../../Redux/Slices/adminApi/adminApislice";
import { NavLink, useNavigate } from "react-router-dom";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Header({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const [logoutCall] = useAdminLogoutMutation();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);

  const logoutHandlder = async () => {
    try {
      const res = await logoutCall()
        .unwrap()
        .catch((err) => console.log("Admin logout", err));
      const data = dispatch(adminLogout());
      navigate("/admin/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Navbar className="fixed top-0 z-20 bg-white shadow-lg px-4 lg:px-12 py-3">
      <div className="flex justify-between items-center text-center text-gray-900 w-full">
        <Typography as="a" href="#" className="text-xl te text-blue-100 font-semibold">
          Admin Control-Panel
        </Typography>
        <div className="flex items-center gap-4">
          {adminInfo && (
            <div className="flex items-center gap-x-1 ">
              <Button
                variant="outlined"
                color="gray"
                className="flex font-normal text-gray-700 me-5 justify-center items-center"
                onClick={logoutHandlder}
              >
                <PowerIcon className="w-5 me-2" />
                Log out
              </Button>
              <NavLink
                    onClick={handleToggle}
                    className={`flex justify-between items-center text-sm font-semibold`}
                  >
                    {sidebarOpen ? (
                      <AiOutlineCloseCircle className="w-8 h-8 mt-1 text-blue-100 my-auto" />
                    ) : (
                      <TbLayoutSidebarRightExpand className="w-8 h-8 mt-1 text-blue-100 my-auto" />
                    )}
                  </NavLink>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
