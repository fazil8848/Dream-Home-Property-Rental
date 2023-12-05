import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BiLogIn } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { useLogoutMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { logout } from "../../../Redux/Slices/authSlice";
import { generateError } from "../../Dependencies/toast";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandlder = async () => {
    try {
      const res = await logoutCall().unwrap();
      if (res.error) {
        generateError(res.error);
      } else {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      generateError(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <header className="bg-white w-screen z-50 shadow-lg ">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-2.5 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink to={"/"} className="-m-1.5 p-1.5">
              <img
                className="h-10 w-auto "
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1698481855/dreamHome/crmkxhhd0fhhcb8kbk0x.png"
                alt="logo"
              />
            </NavLink>
          </div>

          <div
            className={` lg:flex lg:gap-x-12 ${isNavOpen ? "block" : "hidden"}`}
          >
            <ul
              className="list-none lg:flex lg:gap-x-12  "
              aria-hidden={!isNavOpen}
            >
              <li className="my-1">
                <NavLink
                  to="/properties"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
                >
                  Properties
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to={"/ownerBenefiets"}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
                >
                  For Owners
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/blogs"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-black"
                >
                  Blogs
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={`hidden lg:flex lg:flex-1 lg:justify-end `}>
            {userInfo ? (
              <>
                <NavLink
                  to="/chat"
                  className={`bg-White rounded p-2 text-coolblue border-1 border-grey`}
                >
                  <BsFillChatQuoteFill size={20}/>
                </NavLink>
                <NavLink
                  to="/profile"
                  className={`flex justify-between gap-1 items-center text-sm font-semibold bg-White p-2 rounded leading-6 text-coolblue border-1 border-grey`}
                >
                  <FaUserTie size={20} />
                </NavLink>
                <NavLink
                  className={` p-2 rounded leading-6 text-black border-1 border-white`}
                  onClick={logoutHandlder}
                >
                  <FiLogOut size={20} />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`flex justify-between items-center text-sm font-semibold bg-White p-2 rounded leading-6 text-coolblue me-4 border-1 border-grey`}
                >
                  Log in
                  <span aria-hidden="true">
                    <BiLogIn />
                  </span>
                </NavLink>
                <NavLink
                  to="/owner/login"
                  className={`flex justify-between items-center text-sm font-semibold bg-blue-100 p-2 rounded leading-6 text-white border-1 border-white`}
                >
                  Post Property
                  <span aria-hidden="true">
                    <BsFillBuildingsFill className="mx-2" />
                  </span>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
