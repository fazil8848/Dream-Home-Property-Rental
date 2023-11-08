import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { setCredentials } from "../../../Redux/Slices/authSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const Signup = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.user);

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const generateSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (
      fisrtName === "" ||
      lastName === "" ||
      email === "" ||
      mobile === "" ||
      password === ""
    ) {
      generateError("Please fill all the required fields");
    } else if (
      password.length < 7 ||
      (password.length > 17 && !strongPasswordRegex.test(password))
    ) {
      generateError("Please enter a strong password");
    } else if (password !== confirmPassword) {
      generateError("Please Enter Matching Passwords");
    } else {
      try {
        const res = await register({
          fisrtName,
          lastName,
          email,
          password,
          mobile,
        });

        console.log(res);
        if (res.data.user) {
          generateSuccess("Verification mail Send, check your email");
        } else {
          generateError(res.error.data.error);
        }
        // navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <div className="w-full  border bg-gray-100">
        <div className="relative w-11/12 md:w-7/12 mx-auto m-12 px-8 bg-white rounded-md shadow-md">
          <div className=" mx-auto ">
            <div className="relative pb-16">
              <div className=" ml-8 pt-10 font-semibold text-[#252525] text-2xl leading-[48px]">
                Create An Account
              </div>
              <div className=" flex ml-8">
                <div className="font-normal  text-[#696969] text-base">
                  Existing User..?
                </div>
                <Link
                  to={"/login"}
                  className="font-normal text-[#333333] text-base ml-2 underline"
                >
                  Sign In
                </Link>
              </div>
              <div>
                <form onSubmit={submitHandler} className="mt-8">
                  <div className="px-2 w-full flex my-3 justify-between gap-4">
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">First name</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-full border-1 border-sky-100 bg-gray-200  rounded px-4 py-3"
                          placeholder="First name...."
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">Last name</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                          placeholder="Last name...."
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 w-full flex my-3 justify-between gap-4">
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">Email</label>
                      </div>
                      <div>
                        <input
                          type="email"
                          className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                          placeholder="Email...."
                          autoComplete="username"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">Mobile</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                          placeholder="Mobile...."
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 w-full flex my-3 justify-between gap-4">
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">Password</label>
                      </div>
                      <div>
                        <input
                          type="password"
                          className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                          placeholder="Password...."
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 flex-col">
                      <div className="my-1">
                        <label className="text-gray-600">
                          Confirm Password
                        </label>
                      </div>
                      <div>
                        <input
                          type="password"
                          className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                          placeholder="Confirm Password...."
                          autoComplete="new-password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" w-full flex justify-center ">
                    <button
                      type="submit"
                      className="w-3/4 md:w-2/4 bg-blue-100 text-white text-base font-medium py-3 rounded hover:bg-blue-950 mt-4"
                    >
                      {isLoading ? (
                        <div className="mx-[50%]">
                          <Spinner />
                        </div>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
