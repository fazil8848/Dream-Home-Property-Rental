import React, { useEffect, useState } from "react";
import PropertyDetails from "../../../components/User/PropertyDetails/PropertyDetails";
import { useGetSinglePropertyMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { useParams } from "react-router-dom";
import SiglePropertyCard from "../../../components/User/SiglePropertyCard/SiglePropertyCard";

const SinglePropertyPage = () => {
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

  return (
    <div className="flex justify-center gap-3 mt-10 px-2 md:px-10 lg:px-30 xl:px-40">
      <PropertyDetails property={property} setProperty={setProperty} />
    </div>
  );
};

export default SinglePropertyPage;
