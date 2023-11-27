import React, { useState } from "react";
import PropertyImageCarousal from "../PropertyImageCarousal/PropertyImageCarousal";
import { List, ListItem, Typography } from "@material-tailwind/react";
import { IoIosBed, IoIosHome } from "react-icons/io";
import { PiBathtub } from "react-icons/pi";
import { GoCheck, GoX } from "react-icons/go";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import GoogleMapUser from "../../Dependencies/GooleMapUser/GoogleMapUser";

const PropertyDetails = ({ property, setProperty }) => {
  if (!property) {
    return (
      <div className="border w-9/12 min-h-screen mb-10 p-3 flex items-center justify-center">
        <div className=" h-10">
          <div className="animate-spin h-20 w-20">
            <div className="h-full w-full border-4 border-t-blue-100 border-b-blue-100 rounded-[50%]"></div>
          </div>
        </div>
      </div>
    );
  }

  const {
    property_name,
    property_rent,
    property_type,
    ImageUrls,
    details,
    amenities,
    property_location,
    property_description,
  } = property;

  const createdDate = new Date(property.createdAt).toLocaleDateString();
  const idString = String(property._id);

  const id = [
    idString.slice(0, Math.floor(idString.length / 2)),
    idString.slice(Math.floor(idString.length / 2)),
  ];
  const [tt, ID] = id;
  return (
    <div className="border w-9/12 min-h-screen mb-10 p-3">
      <div className="flex justify-between w-full px-2 mb-2">
        <div className=" flex gap-4 ">
          <p className="border text-white rounded-md shadow-inner bg-sky-500 text-xs w-fit p-2 ">
            FOR RENT
          </p>
          <p className="p-1">{createdDate}</p>
        </div>
        <div className=" flex gap-4">
          <p className="border text-white shadow-inner rounded-md bg-green-500 text-xs w-fit p-2 ">
            &#10003; Verified
          </p>
          <p className="border border-gray-200 font-poppins flex items-center gap-2 p-1 rounded-md">
            <IoIosHome className="mb-1" />
            ID: {ID}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between gap-3 px-2">
        <div>
          <Typography className="text-2xl text-black font-ubuntu font-semibold mb-2">
            {property_name} for rent in {property_location.locality},
            {property_location.district}
          </Typography>
          <Typography variant="paragraph">
            {property_location.address}
          </Typography>
        </div>
        <div>
          <Typography className="text-xl text-black font-semibold mb-2">
            ₹ {property_rent}
          </Typography>
          <Typography className="text-sm text-gray-500 font-light">
            Built Area : {details.built_up_area}(sq.ft)
          </Typography>
        </div>
      </div>
      <div className="h-[30rem]">
        <PropertyImageCarousal ImageUrls={ImageUrls} />
      </div>
      <div className="w-full justify-between flex">
        {ImageUrls.map((url) => {
          return (
            <div className="m-4 w-1/5">
              <img src={url} alt="" className="h-28 w-full" />
            </div>
          );
        })}
      </div>

      <div className=" w-full font-poppins text-base mt-10 mx-2">
        <div>
          <Typography
            variant="lead"
            className="tracking-wider py-3 border-t mx-2 font-poppins font-medium"
          >
            Description
          </Typography>
          <div className="">
            <Typography variant="small" className=" text-gray-600">
              {property_description}
            </Typography>
          </div>
        </div>
      </div>

      <div className=" w-full text-base  my-10 mx-2 ">
        <div>
          <Typography
            variant="lead"
            className="tracking-widest border-t py-3 mx-2 font-poppins font-medium"
          >
            Highlights
          </Typography>
          <div className=" ">
            <ul className="list-disc space-y-2 mb-5">
              {amenities.pool && (
                <li className="flex items-center text-xs text-gray-500">
                  <span className="text-black mr-2">&#8226;</span>
                  Dive into our eco-friendly indoor pool
                </li>
              )}
              <li className="flex items-center text-xs text-gray-500">
                <span className="text-black mr-2">&#8226;</span>
                Gym for fitness enthusiasts
              </li>
              <li className="flex items-center text-xs text-gray-500">
                <span className="text-black mr-2">&#8226;</span>
                Piped music in select areas
              </li>
              {amenities.security && (
                <li className="flex items-center text-xs text-gray-500">
                  <span className="text-black mr-2">&#8226;</span>
                  24/7 security ensures peace of mind
                </li>
              )}
              {amenities.play_area && (
                <li className="flex items-center text-xs text-gray-500">
                  <span className="text-black mr-2">&#8226;</span>
                  Dedicated children's play area
                </li>
              )}
              {details.number_floors > 1 && (
                <li className="flex items-center text-xs text-gray-500">
                  <span className="text-black mr-2">&#8226;</span>
                  Efficient lifts for resident's convenience
                </li>
              )}
              <li className="flex items-center text-xs text-gray-500">
                <span className="text-black mr-2">&#8226;</span>
                Item 3
              </li>
              {amenities.cctv && (
                <li className="flex items-center text-xs text-gray-500">
                  <span className="text-black mr-2">&#8226;</span>
                  24/7 CCTV syrvailance for protecting you and your property
                </li>
              )}
              <li className="flex items-center text-xs text-gray-500">
                <span className="text-black mr-2">&#8226;</span>
                Engage in indoor games in our multi-recreation hall
              </li>
            </ul>
            <p className="text-xs text-gray-500">
              At our property, we don't just offer homes; we promise a
              lifestyle. Experience living, like never before.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t mx-2">
        <div className="mt-5">
          <Typography
            variant="lead"
            className="tracking-wider font-poppins font-medium "
          >
            Facts and Features
          </Typography>
        </div>
        <div className="w-full my-2">
          <div className="flex justify-between py-5">
            <div className="flex gap-5 w-full items-center">
              <img
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1701068045/dreamHome/icons/Screenshot_2023-11-27_122322-removebg-preview_aeaqwb.png"
                className=" h-10 p-0.5"
                alt=""
              />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  TYPE
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {property_type}
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              <img
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1701067832/dreamHome/icons/Screenshot_2023-11-27_121220-removebg-preview_nvdwpm.png"
                className=" h-10"
                alt=""
              />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  BUIT_UP_AREA
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {details.built_up_area}
                  <span className="font-extralight text-gray-500">(sq.ft)</span>
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              <img
                src="https://res.cloudinary.com/dn6anfym7/image/upload/v1701067832/dreamHome/icons/Screenshot_2023-11-27_121220-removebg-preview_nvdwpm.png"
                className=" h-10"
                alt=""
              />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  CARPET AREA
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {details.carpet_area}
                  <span className="font-extralight text-gray-500">(sq.ft)</span>
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div className="flex gap-5 w-full items-center">
              <IoIosBed className="w-10 h-10 text-prptyIcons" />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  BED ROOMS
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {details.number_bedrooms}
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              <PiBathtub className="w-10 h-10 text-prptyIcons" />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  BATH ROOMS
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {details.number_bathrooms}
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              <HiOutlineDocumentCheck className="w-10 h-10 text-prptyIcons" />

              <div>
                <Typography className="text-base text-gray-600 font-extralight">
                  Status
                </Typography>
                <Typography variant="paragraph" className="font-semibold">
                  {/* {details.status} */}
                  Available
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full border-t my-10 mx-2 ">
        <div>
          <div className="my-3">
            <Typography
              variant="lead"
              className="tracking-wider font-poppins font-medium "
            >
              Additional Details
            </Typography>
          </div>
          <div className=" ">
            <ul className="list-disc space-y-2 mb-5 flex justify-between">
              <div className="w-full">
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Property ID:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {ID}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Furnishing Status:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.furinishing_status}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Highway Accessibility:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.road_accessibility ? "Yes" : "No"}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Number Of floors:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.number_floors}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    Water Acessibility:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.water_accessibilty}
                  </span>
                </li>
              </div>

              <div className="w-full">
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Parking For:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {amenities.parking} Cars
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Type Of Flooring:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.type_flooring}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Power BackUp:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.power_backup ? "Yes" : "No"}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Balconies:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {details.number_balconies}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    AC:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {amenities.AC}
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t mx-2">
        <div className="mt-5">
          <Typography
            variant="lead"
            className="tracking-wider font-poppins font-medium "
          >
            Amenities
          </Typography>
        </div>
        <div className="w-full my-2 mx-3">
          <div className="flex justify-between py-5">
            <div className="flex gap-5 w-full items-center">
              {amenities.Wifi ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  WiFi
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              {amenities.hospital_facility ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  Hospital Nearby
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              {amenities.cctv ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  CCTV
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div className="flex gap-5 w-full items-center">
              {amenities.security ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  Security
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              {amenities.pool ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}
              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  Pool
                </Typography>
              </div>
            </div>

            <div className="flex gap-5 w-full items-center">
              {amenities.parking > 0 ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  Parking
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div className="flex gap-5 w-full items-center">
              {amenities.shopping_facility ? (
                <GoCheck className="w-10 h-10 text-prptyIcons" />
              ) : (
                <GoX className="w-10 h-10 text-red-500" />
              )}

              <div>
                <Typography className="text-sm text-gray-600 font-extralight">
                  Shopping Facility
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full border-t my-10 px-2 ">
        <div>
          <div className="my-3">
            <Typography
              variant="lead"
              className="tracking-wider font-poppins font-medium "
            >
              Location
            </Typography>
          </div>
          <div className=" ">
            <ul className="list-disc space-y-2 mb-5 flex justify-between">
              <div className="w-full">
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Country:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.country}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    State:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.state}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Zip/Postal Code:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.pin_code}
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Full Address:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.address}
                  </span>
                </li>
               
              </div>

              <div className="w-full">
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    District:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.district} Cars
                  </span>
                </li>
                <li className="flex items-center text-xs gap-3 my-2">
                  <span className="font-poppins font-medium text-sm text-black">
                    {" "}
                    Locality:
                  </span>
                  <span className="font-poppins font-light text-sm text-gray-500">
                    {property_location.locality}
                  </span>
                </li>
              </div>
            </ul>
            <div className="h-96">
              <GoogleMapUser longitude={property_location.longitude} latitude={property_location.latitude}/>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetails;
