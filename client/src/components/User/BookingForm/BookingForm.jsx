import React, { useEffect, useState } from "react";
import { useGetSinglePropertyMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const BookingForm = () => {
  const [property, setProperty] = useState();
  const [getSinglePropertyCall] = useGetSinglePropertyMutation();

  const { id } = useParams();

  const fetchProperty = async () => {
    try {
      const res = await getSinglePropertyCall(id).unwrap();
      setProperty(res.property);
    } catch (error) {
      throw new Error('System Error:- "Error While Fetching Property Data"');
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className=" h-10">
          <div className="animate-spin h-20 w-20">
            <div className="h-full w-full border-4 border-t-blue-100 border-b-blue-100 rounded-[50%]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-blue-gray-50 xl:px-80 xl:py-20 lg:px-48 lg:py-16 md:px-28 md:py-10 p-10">
      <div className="col-span-5 xl:col-span-3 h-full ">
        <div className="rounded-md border border-stroke bg-white shadow-default pb-10 h-full">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="text-2xl font-medium font-poppins text-blue-100 py-3">
              Book Property
            </h3>
          </div>

          <div className="p-7">
            <form>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 lg:w-1/2">
                  <div className="mb-5">
                    <label
                      for="fName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      placeholder="First Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 lg:w-1/2">
                  <div className="mb-5">
                    <label
                      for="lName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      placeholder="Last Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 lg:w-1/2">
                  <div className="mb-5">
                    <label
                      for="fName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Contact
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      placeholder="First Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 lg:w-1/2">
                  <div className="mb-5">
                    <label
                      for="lName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      placeholder="Last Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="mb-5">
                <label
                  for="guest"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Address
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="Address..."
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div> */}

              <div className="-mx-3 lg:flex flex-wrap">
                <div className="w-full px-3 lg:w-1/2">
                  <div className="mb-5">
                    <label
                      for="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 lg:w-1/2">
                  <div className="flex justify-between items-center h-[7.5rem]">
                    <div className="flex">
                      <span>{`Token Amount : ${property.property_rent} * 0.5 `}</span> = 
                      <span>{property.property_rent * 0.5}</span>
                    </div>
                    <div className=" mx-5">
                      <Button className=" text-black border border-black bg-white hover:text-white hover:bg-black">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Button className=" border float-right border-black rounded-md bg-white py-3 px-8 text-center text-base font-semibold text-black hover:bg-black hover:text-white ">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
