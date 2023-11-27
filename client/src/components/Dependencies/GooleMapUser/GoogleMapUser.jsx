import React, { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { GiSkeleton } from "react-icons/gi";


const GoogleMapUser = ({ longitude, latitude }) => {

    const [selectedLocation, setSelectedLocation] = useState({
    lat: longitude,
    lng: latitude,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });


  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <GiSkeleton />;
  }

  return (
    <>
      <GoogleMap
        center={selectedLocation}
        zoom={longitude || latitude > 0 ? 9 : 1}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: true,
        }}
      >
        {/* Display the selected location marker */}
        <Marker position={selectedLocation} />
      </GoogleMap>
    </>
  );
};

export default GoogleMapUser;
