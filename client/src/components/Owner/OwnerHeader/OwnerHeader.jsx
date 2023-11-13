import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useOwnerLogoutMutation } from "../../../Redux/Slices/ownerApi/ownerApiSlice";
import { ownerLogout } from "../../../Redux/Slices/ownerApi/ownerAuthSlicel";

const OwnerHeader = () => {
  const [logoutCall] = useOwnerLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 


  const logoutHandlder = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(ownerLogout());
      navigate("/owner/login");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <header className="fixed px-8 top-0 z-50 flex w-full bg-white drop-shadow-md">
        <nav
          className="mx-auto flex w-full justify-between p-2.5 lg:px-8"
          aria-label="Global"
        >
          <div className="flex  lg:flex-1">
            <NavLink to={"/owner"} className="-m-1.5 p-1.5">
              <span className="sr-only">DreamHomes</span>
              <img
                className="h-10 w-auto "
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1698481855/dreamHome/crmkxhhd0fhhcb8kbk0x.png"
                alt="logo"
              />
            </NavLink>
          </div>
          

          <div className={`hidden lg:flex lg:flex-1 lg:justify-end `}>
              <>
                <NavLink
                  className={`flex justify-between items-center text-sm font-semibold bg-blue-100 p-2 rounded leading-6 text-white border-1 border-white`}
                  onClick={logoutHandlder}
                >
                  LogOut
                  <span aria-hidden="true">
                    <TbLogout2 />
                  </span>
                </NavLink>
              </>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default OwnerHeader;
