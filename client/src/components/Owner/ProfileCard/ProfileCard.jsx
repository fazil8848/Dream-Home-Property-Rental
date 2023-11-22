import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOwnerMutation,
  useUpdateOwnerMutation,
} from "../../../Redux/Slices/ownerApi/ownerApiSlice";
import { setOwnerCredentials } from "../../../Redux/Slices/ownerApi/ownerAuthSlicel";

const ProfileCard = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [getOwnerCall] = useGetOwnerMutation();
  const [setOwnerCall] = useUpdateOwnerMutation();
  const dispatch = useDispatch();
  const [KYCAdded, setKYCAdded] = useState(true);

  const { ownerInfo } = useSelector((state) => state.owner);

  const fetchOwner = async () => {
    try {
      const result = await getOwnerCall(ownerInfo._id);
      console.log("----------------------------", result);

      const { fullName, email, mobile, kycAdded } = result.data.owner;
      const [fName, sName] = fullName.split(" ");
      kycAdded ? setKYCAdded(true) : setKYCAdded(false);
      setFirstName(fName);
      setEmail(email);
      setLastName(sName);
      setMobile(mobile);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    fetchOwner();
  }, [ownerInfo._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      fisrtName.trim() === "" ||
      lastName.trim() === "" ||
      mobile.trim() === ""
    ) {
      return toast.error("Please fill all the fields");
    }

    try {
      const res = await setOwnerCall({
        id: ownerInfo._id,
        fisrtName,
        lastName,
        email,
        mobile,
      });

      const { owner, ownerinfo } = res.data;
      const [first, sp, last] = owner.fullName.split(" ");

      dispatch(setOwnerCredentials(ownerinfo));
      setEmail(owner.email);
      setFirstName(first);
      setLastName(last);
      setMobile(owner.mobile);

      if (res.data.owner) {
        toast.success("Account updation success");
      } else {
        toast.error(res.error.data.error);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="overflow-hidden rounded-md min-h-screen bg-gray-100 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-5 ">
          <div className="z-50 mx-auto bg-white w-4/5 shadow-xl min-h-full">
            <div className=" mx-auto lg:p-8 w-full lg:w-3/4 ">
              <div className="relative pb-16">
                <div className="z-20 h-35 md:h-65">
                  {!KYCAdded && <NavLink
                    to={"/owner/profile/kyc"}
                    className="float-right m-8 px-4 py-2 bg-blue-100 text-center rounded-md text-white hover:bg-blue-950 "
                  >
                    Add Kyc
                  </NavLink>}
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
                            value={fisrtName}
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
                            value={lastName}
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
                            value={email}
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
                            value={mobile}
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
