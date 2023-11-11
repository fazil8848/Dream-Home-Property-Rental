import React, { useEffect, useState } from "react";
import { useAdminLoginMutation } from "../../../Redux/Slices/adminApi/adminApislice";
import { useDispatch, useSelector } from "react-redux";
import { setAdminCredentials } from "../../../Redux/Slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, { isLoading }] = useAdminLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminInfo = useSelector((state) => state.admin.adminInfo);

  useEffect(() => {
    if (adminInfo) {
      console.log(adminInfo);
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setAdminCredentials(res));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="min-h-[84vh] bg-loginBg bg-cover bg-center flex justify-center items-center">
        <div className=" md:flex gap-5 w-4/6 md:w-3/6 px-10 py-6 bg-white-50 rounded-lg shadow-md">
          <div className="w-full md:w-1/2">
            <div>
              <div className=" font-semibold text-[#252525] text-2xl leading-[48px]">
                Admin LogIn
              </div>
              <div className="h-0.5 bg-blue-100 "></div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="flex-row justify-center py-2">
                <div className="w-full py-2 ">
                  <label
                    className="block mb-1 text-gray-700 text-base "
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full py-2 ">
                  <label
                    className="block mb-1 text-gray-700 text-base"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-center items-center">
                <button
                  type="submit"
                  className="w-2/4 bg-blue-100 text-white text-base font-medium py-3 rounded hover:bg-blue-950"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="w-1/2 hidden md:block">
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dn6anfym7/image/upload/v1699543390/Login-rafiki_1_n50szc.png"
              alt="mmm"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
