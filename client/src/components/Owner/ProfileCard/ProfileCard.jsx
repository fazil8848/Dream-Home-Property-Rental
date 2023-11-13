import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileCard = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  // const [getOwnerCall] = useGetOwnerMutation()

  const { ownerInfo } = useSelector((state) => state.owner);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const result = await getOwner(ownerInfo._id);
        console.log(result);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchOwner();
  },[ownerInfo._id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        fisrtName,
        lastName,
        email,
        mobile,
      });

      console.log(res);
      if (res?.data?.user) {
        generateSuccess("Verification mail Send, check your email");
        setTimeout(() => {
          window.open("https://mail.google.com/", "_blank");
        }, 2000);
      } else {
        generateError(res.error.data.error);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="ms-64 overflow-hidden rounded-md border border-stroke min-h-screen bg-gray-100 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-5 ">
          <div className="z-50 mx-auto bg-white w-4/5 shadow-xl min-h-full">
            <div className=" mx-auto lg:p-8 w-full lg:w-3/4 ">
              <div className="relative pb-16">
                <div className="z-20 h-35 md:h-65">
                  <NavLink
                    to={"/owner/kyc"}
                    className="float-right m-8 px-4 py-2 bg-blue-100 text-center rounded-md text-white hover:bg-blue-950 "
                  >
                    Add Kyc
                  </NavLink>
                </div>
                <div className=" ml-8 pt-10 font-semibold text-[#252525] text-2xl leading-[48px]">
                  Profile
                </div>
                <div className="h-0.5 my-3 bg-blue-100 "></div>
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

                    <div className=" w-full flex justify-center ">
                      <button
                        type="submit"
                        className="w-3/4 md:w-2/4 bg-blue-100 text-white text-base font-medium py-3 rounded hover:bg-blue-950 mt-4"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
