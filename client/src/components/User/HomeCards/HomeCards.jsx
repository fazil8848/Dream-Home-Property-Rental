import React, { useEffect, useState } from "react";
import { GiBathtub } from "react-icons/gi";
import { SiBlueprint } from "react-icons/si";
import { IoIosBed } from "react-icons/io";
import { useGetPropertiesuserMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { Link } from "react-router-dom";
import { generateError } from "../../Dependencies/toast";

export const HomeCards = () => {
  const [properties, setProperties] = useState([]);
  const [getPropertiesCall] = useGetPropertiesuserMutation();
  const fetchProperties = async () => {
    try {
      const res = await getPropertiesCall().unwrap();
      if (res.error) {
        generateError(res.error);
        return;
      } else {
        setProperties(res.properties);
      }
    } catch (error) {
      generateError(error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="frame container mx-auto my-8 lg:px-8 ">
      <div className="main-section">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <div className="md:w-1/2 w-full mb-4 md:mb-0">
            <p className="text-2xl font-bold mb-2">
              Best Properties Available For You To Choose
            </p>
            <div className="h-1 bg-sky-500 w-12 my-2"></div>
            <p className="text-sm">
              Here is the list of properties for sale in Kerala, that include
              apartments, flats, office spaces, and houses for sale in Kerala.
            </p>
          </div>
          <Link to={'/properties'} className="text-blue-500 text-lg cursor-pointer border p-2 rounded bg-sky-50">
            See all properties &#8594;
          </Link>
        </div>
        <div className="overflow-x-auto xl:w-1\3  md:h-[30rem]">
          <div className="flex flex-wrap">
            {properties.map((property, index) => (
              <Link
                to={`/property/${property._id}`}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 cursor-pointer md:h-[20rem]"
                key={index}
              >
                <div className="bg-white px-1 pt-2 pb-8 shadow-2xl  border-t-2 border-gray-100">
                  <div className="text-xl font-bold mb-2">
                    <img
                      className="sm:h-56 w-full rounded"
                      src={property.ImageUrls[0]}
                      alt=""
                    />
                  </div>
                  <div className="m-2">
                    <div className="text-lg font-bold mb-2 border-b h-16">
                      {property.property_name}
                    </div>
                    <div className="flex justify-between my-2">
                      <div className="flex items-center mt-2">
                        <IoIosBed className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">
                          {property.details.number_bedrooms} Br
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <GiBathtub className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">
                          {property.details.number_bathrooms} Ba
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <SiBlueprint className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">
                          {property.details.built_up_area} sq.ft.
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between border-t">
                      <div className="text-xl font-bold mt-2">
                        ₹{property.property_rent}
                      </div>
                      <div className="text-blue-500 mt-2 cursor-pointer">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
