import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdVilla } from "react-icons/md";
import { useGetPropertiesMutation } from "../../../Redux/Slices/ownerApi/ownerApiSlice";
import { useSelector } from "react-redux";
import { generateError } from "../../Dependencies/toast";

const Properties = () => {
  const [getProperties, { isLoading }] = useGetPropertiesMutation();
  const { ownerInfo } = useSelector((state) => state.owner);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProperties({ id: ownerInfo._id }).unwrap();
        if (res.error) {
          generateError(res.error);
          return;
        } else {
          setProperties(res.properties);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [getProperties, ownerInfo._id]);

  return (
    <>
      <div className="rounded-md border border-stroke bg-white shadow-default mb-4">
        <div className="py-3 px-4  flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black ">Properties</h4>
          <Link
            to={"/owner/properties/addproperties"}
            className="flex justify-center font-semibold items-center bg-white gap-2 px-4 py-2 border border-gray-400 rounded-md hover:shadow-2xl hover:text-white hover:bg-blue-100"
          >
            <MdVilla /> Add
          </Link>
        </div>
      </div>
      {properties.map((property) => {
        return (
          <div
            key={property._id}
            className="bg-white rounded border shadow-md p-3 w-full flex gap-3 mb-3"
          >
            <div className="w-4/12 ">
              <img
                className="rounded w-full max-h-80 "
                src={property?.ImageUrls[0]}
                alt=""
              />
            </div>
            <div className="w-5/12">
              <div>
                <p className="font-semibold">{property.property_name}</p>
                <p className="font-semibold ">
                  {property.property_location.district},
                  {property.property_location.locality}
                </p>
                <p className="font-bold mt-1 mb-2">₹{property.property_rent}</p>
                <Link
                  to={`/owner/properties/editProperties/${property._id}`}
                  className="bg-blue-100 text-sm rounded px-2 py-1 text-white "
                >
                  More Actions ↓
                </Link>
              </div>
            </div>
            <div className=" w-3/12 flex justify-end">
              <div className="mt-10">
                <p className="border  border-sky-300 text-xs w-fit py-1 px-2 ">
                  FOR RENT
                </p>
                {property.isApproved ? (
                  <p className="text-green-500 font-medium">Approved</p>
                ) : (
                  <p className="text-red-500 font-medium">Not Approved</p>
                )}
                <p className="text-sm font-medium font-poppins text-gray-500">
                  POSTED ON:{" "}
                  {property.createdAt
                    ? new Date(property.createdAt).toISOString().slice(0, 10)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Properties;

{
  /* <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Property Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Property Type</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rent Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Aprroval</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Details</p>
        </div>
      </div>

      {properties.map((property) => {
        return (
          <div
            className="grid grid-cols-6 border-t h-32 border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={property.id}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="h-12 w-16">
                  <img className="rounded-md" src={property.ImageUrls[0]} alt="Product" />
                </div>
                <p className="text-sm text-black ">
                  {property.property_name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black ">{property.property_type}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black ">{`₹${property.property_rent}`}</p>
            </div>
            <div className="col-span-1 jus flex items-center">
              {property.isApproved ? (<IoMdCheckmarkCircleOutline  className="h-6 w-6 text-green-400" />):
              (<IoMdCloseCircleOutline className="h-6 w-6  text-red-500 rounded-xl" />)}
            </div>
            <div className="col-span-1 flex items-center">
              <Link className=" border hover:bg-black hover:text-white font-semibold hover:drop-shadow-xl border-gray-400 rounded py-2 px-4">
                  Edit
              </Link>
            </div>
          </div>
        );
      })} */
}
