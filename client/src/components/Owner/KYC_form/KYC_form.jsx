import React, { useState } from "react";
import { useAddKycMutation } from "../../../Redux/Slices/ownerApi/ownerApiSlice";

const KYC_form = () => {
  const [full_name, setFull_name] = useState(null);
  const [email, setEmail] = useState(null);
  const [PAN, setPAN] = useState(null);
  const [country, setCountry] = useState(null);
  const [Occupation, setOccupation] = useState(null);
  const [State, setState] = useState(null);
  const [Address, setAddress] = useState(null);
  const [workDetails, setWorkDetails] = useState(null);
  const [ZipCode, setZipCode] = useState(null);
  const [City, setCity] = useState(null);
  const [portrate, setPortrate] = useState(null);

  const [addKYCCall, { isLoading }] = useAddKycMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const KYC = {
        full_name,
        email,
        PAN,
        country,
        Occupation,
        State,
        Address,
        workDetails,
        ZipCode,
        City,
        portrate,
      };
      const result = await addKYCCall(KYC);
    } catch (error) {}
  };

  return (
    <>
      <div className="ms-64 min-h-[85vh] bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={submitHandler}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label for="full_name">Full Name</label>
                        <input
                          onChange={(e) => setFull_name(e.target.value)}
                          type="text"
                          name="full_name"
                          id="full_name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder={
                            full_name ? full_name : "entert the fullname"
                          }
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="email">Email Address</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={email ? email : "Enter Your Email"}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="email">Pan Card</label>
                        <input
                          onChange={(e) => setPAN(e.target.value)}
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={PAN ? PAN : "Enter Your Pan"}
                        />
                      </div>

                      <div className="md:col-span-3 ">
                        <label for="address">Portrate</label>
                        <input
                          onChange={(e) => setPortrate(e.target.value)}
                          type="file"
                          className="h-10 border-black mt-1 rounded p-2 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label for="email">Occupation</label>
                        <input
                          onChange={(e) => setOccupation(e.target.value)}
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={
                            Occupation ? Occupation : "Enter Your Occupation"
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="email">Work Details</label>
                        <input
                          onChange={(e) => setWorkDetails(e.target.value)}
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={
                            workDetails ? workDetails : "Enter Work Details"
                          }
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label for="address">Address / Street</label>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          name="address"
                          id="address"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={
                            Address ? Address : "Enter Address"
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="city">City</label>
                        <input
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                          name="city"
                          id="city"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder={City ? City : "Enter City"}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label for="country">Country / region</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            onChange={(e) => setCountry(e.target.value)}
                            name="country"
                            id="country"
                            placeholder="Country"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value={country ? country : "Enter country"}
                          />
                          <button
                            tabindex="-1"
                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabindex="-1"
                            for="show_more"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label for="state">State / province</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            onChange={(e) => setState(e.target.value)}
                            name="state"
                            id="state"
                            placeholder={State ? State : "Enter State"}
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value=""
                          />
                          <button
                            tabindex="-1"
                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabindex="-1"
                            for="show_more"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label for="zipcode">Zipcode</label>
                        <input
                          onChange={(e) => setZipCode(e.target.value)}
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder={
                            ZipCode ? ZipCode : "Enter Zipcode"
                          }
                          value=""
                        />
                      </div>

                      {/* <div className="md:col-span-2">
                      <label for="soda">How many soda pops?</label>
                      <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <button
                          tabindex="-1"
                          for="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mx-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <input
                        onChange={(e)=>set(e.target.value)}
                          name="soda"
                          id="soda"
                          placeholder="0"
                          className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value="0"
                        />
                        <button
                          tabindex="-1"
                          for="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mx-2 fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div> */}

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
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

export default KYC_form;
