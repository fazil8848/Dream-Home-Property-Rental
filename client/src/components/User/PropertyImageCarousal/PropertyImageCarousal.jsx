import React from 'react'
import { Carousel } from "@material-tailwind/react";

const PropertyImageCarousal = ({ImageUrls}) => {
  return (
    <>
      <Carousel transition={{ duration: 1.5 }} className="rounded-xl">
          {ImageUrls.map((url, index) => {
            return (
              <img
              key={index}
                src={url}
                alt={`image ${index + 1}`}
                className=" h-full w-full "
              />
            );
          })}
        </Carousel>
    </>
  )
}

export default PropertyImageCarousal
