import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useLogoutMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { logout } from "../../../Redux/Slices/authSlice";
import { generateError } from "../../Dependencies/toast";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const logoutHandlder = async () => {
    try {
      const res = await logoutCall().unwrap();
      if (resizeBy.error) {
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
              <span className="sr-only">DreamHomes</span>
              <img
                className="h-10 w-auto "
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1698481855/dreamHome/crmkxhhd0fhhcb8kbk0x.png"
                alt="logo"
              />
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={handleToggleNav}
              aria-expanded={isNavOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
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
              <div className="flex lg:hidden">
                {userInfo ? (
                  <>
                    <li className="my-1">
                      <NavLink
                        to="/profile"
                        className={`flex justify-between gap-1 items-center text-sm font-semibold bg-White p-2 rounded leading-6 text-coolblue me-4 border-1 border-grey`}
                      >
                        Profile{" "}
                        <span aria-hidden="true">
                          <FaUserTie />
                        </span>
                      </NavLink>
                    </li>
                    <li className="my-1">
                      <NavLink
                        className={`flex justify-between items-center text-sm font-semibold bg-blue-100 p-2 rounded leading-6 text-white border-1 border-white`}
                        onClick={logoutHandlder}
                      >
                        LogOut
                        <span aria-hidden="true">
                          <TbLogout2 />
                        </span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="lg:flex-1">
                      <li className="my-1">
                        <NavLink
                          to="/login"
                          className={`flex justify-between items-center text-sm font-semibold bg-White p-2 rounded leading-6 text-coolblue me-4 border-1 border-grey`}
                        >
                          Log in{" "}
                          <span aria-hidden="true">
                            <BiLogIn />
                          </span>
                        </NavLink>
                      </li>
                      <li className="my-1">
                        <NavLink
                          to="/owner/login"
                          className={`flex justify-between items-center text-sm font-semibold bg-blue-100 p-2 rounded leading-6 text-white border-1 border-white`}
                        >
                          Post Property
                          <span aria-hidden="true">
                            <BsFillBuildingsFill className="mx-2" />
                          </span>
                        </NavLink>
                      </li>
                    </div>
                  </>
                )}
              </div>
            </ul>
          </div>

          <div className={`hidden lg:flex lg:flex-1 lg:justify-end `}>
            {userInfo ? (
              <>
                <NavLink
                  to="/profile"
                  className={`flex justify-between gap-1 items-center text-sm font-semibold bg-White p-2 rounded leading-6 text-coolblue me-4 border-1 border-grey`}
                >
                  Profile{" "}
                  <span aria-hidden="true">
                    <FaUserTie />
                  </span>
                </NavLink>
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
