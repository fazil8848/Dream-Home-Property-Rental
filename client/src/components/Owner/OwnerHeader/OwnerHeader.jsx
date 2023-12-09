import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbLogout2 } from "react-icons/tb";
import { useOwnerLogoutMutation } from "../../../Redux/Slices/ownerApi/ownerApiSlice";
import { ownerLogout } from "../../../Redux/Slices/ownerApi/ownerAuthSlicel";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { generateError } from "../../Dependencies/toast";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { setOwnerOffline, setOwnerOnline } from "../../../Redux/Slices/chatSlices/userChatSlice";

const OwnerHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [logoutCall] = useOwnerLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ownerInfo } = useSelector((state) => state.owner);

  const logoutHandlder = async () => {
    try {
      const res = await logoutCall().unwrap();
      if (res.error) {
        generateError(res.error);
      } else {
        dispatch(ownerLogout());
        dispatch(setOwnerOffline())
        navigate("/owner/login");
      }
    } catch (error) {
      generateError(err?.data?.message || err.error);
    }
  };

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {  
    dispatch(setOwnerOnline(ownerInfo))
  }, [ownerInfo])
  

  return (
    <div>
      <header className="fixed px-8 top-0 z-50 flex w-full bg-white drop-shadow-md">
        <nav
          className="mx-auto flex w-full justify-between p-2.5 lg:px-8"
          aria-label="Global"
        >
          <div className="flex  ">
            <NavLink to={"/owner"} className="-m-1.5 p-1.5">
              <span className="sr-only">DreamHomes</span>
              <img
                className="h-10 w-auto "
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1698481855/dreamHome/crmkxhhd0fhhcb8kbk0x.png"
                alt="logo"
              />
            </NavLink>
          </div>

          <div className={`flex gap-4`}>
            <>
              {ownerInfo && (
                <>
                  <NavLink
                    to="/owner/chat"
                    className={`bg-White rounded p-2 text-coolblue border-1 border-grey`}
                  >
                    <BsFillChatQuoteFill size={20} />
                  </NavLink>
                  <NavLink
                    className={` flex gap-2 items-center text-sm font-semibold border border-gray-500 hover:shadow-2xl hover:drop-shadow-2xl hover:bg-blue-100 p-2 rounded leading-6 hover:text-white `}
                    onClick={logoutHandlder}
                  >
                    LogOut
                    <span aria-hidden="true">
                      <TbLogout2 />
                    </span>
                  </NavLink>

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
                </>
              )}
            </>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default OwnerHeader;
