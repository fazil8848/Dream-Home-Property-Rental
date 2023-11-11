import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { adminLogout } from "../../../Redux/Slices/adminAuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAdminLogoutMutation } from "../../../Redux/Slices/adminApi/adminApislice";

function Header() {
  const dispatch = useDispatch();
  const [logoutCall] = useAdminLogoutMutation();

  const logoutHandlder = async () => {
    try {
      await logoutCall().unwrap().catch((err)=> console.log('Admin logout',err));
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Navbar className="sticky top-0 z-10 bg-white shadow-lg px-4 lg:px-12 py-3">
      <div className="flex justify-between text-center text-gray-900 w-full">
        <Typography as="a" href="#" className="text-xl font-medium">
          Admin Control-Panel
        </Typography>
        <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
