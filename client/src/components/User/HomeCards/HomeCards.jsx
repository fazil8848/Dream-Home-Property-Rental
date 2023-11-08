import React from "react";
import { GiBathtub } from "react-icons/gi";
import { SiBlueprint } from "react-icons/si";
import { IoIosBed } from "react-icons/io";

export const HomeCards = () => {
  const properties = [
    {
      title: "2 BHK Budget Apartment at Kozhikode ",
      image: "image.jpg",
      price: "25 Lac",
      link: "/property-1",
    },
    {
      title: "3 BHK Budget Apartment at Kozhikode ",
      image: "image2.jpg",
      price: "35 Lac",
      link: "/property-2",
    },
    {
      title: "2 BHK Budget Apartment at Kozhikode ",
      image: "image.jpg",
      price: "25 Lac",
      link: "/property-1",
    },
    {
      title: "3 BHK Budget Apartment at Kozhikode ",
      image: "image2.jpg",
      price: "35 Lac",
      link: "/property-2",
    },
    {
      title: "2 BHK Budget Apartment at Kozhikode ",
      image: "image.jpg",
      price: "25 Lac",
      link: "/property-1",
    },
    {
      title: "3 BHK Budget Apartment at Kozhikode ",
      image: "image2.jpg",
      price: "35 Lac",
      link: "/property-2",
    },
    {
      title: "2 BHK Budget Apartment at Kozhikode ",
      image: "image.jpg",
      price: "25 Lac",
      link: "/property-1",
    },
    {
      title: "3 BHK Budget Apartment at Kozhikode ",
      image: "image2.jpg",
      price: "35 Lac",
      link: "/property-2",
    },
  ];

  return (
    <div className="frame container mx-auto my-8 md:px-8">
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
          <div className="text-blue-500 text-lg cursor-pointer border p-2 rounded bg-sky-50">
            See all properties &#8594;
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-wrap">
            {properties.map((property, index) => (
              <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                key={index}
              >
                <div className="bg-white px-1 pt-2 pb-8 shadow-2xl border-t-2 border-gray-100">
                  <div className="text-xl font-bold mb-2">
                    <img
                      className="h-80 w-full rounded"
                      src="https://res.cloudinary.com/dn6anfym7/image/upload/v1698482035/dreamHome/h4vnyiujlnurhzhjn98u.jpg"
                      alt=""
                    />
                  </div>
                  <div className="m-2">
                    <div className="text-lg font-bold mb-2 border-b">
                      {property.title}
                    </div>
                    <div className="flex justify-between my-2">
                      <div className="flex items-center mt-2">
                        <IoIosBed className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">2 Br</div>
                      </div>
                      <div className="flex items-center mt-2">
                        <GiBathtub className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">2 Ba</div>
                      </div>
                      <div className="flex items-center mt-2">
                        <SiBlueprint className="w-6 h-6 mr-2 text-sky-500" />
                        <div className="text-gray-700">792 sq.ft.</div>
                      </div>
                    </div>
                    <div className="flex justify-between border-t">
                      <div className="text-xl font-bold mt-2">
                        {property.price}
                      </div>
                      <div className="text-blue-500 mt-2 cursor-pointer">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
