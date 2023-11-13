import React from "react";
import OwnerNav from "../OwnerNav/OwnerNav";
import VisitorChart from "../VisitorChart/VisitorChart";

const OwnerDashboard = () => {
  return (
    <div class="flex">
        <div className="ms-64 w-full mt-4 grid grid-cols-12 gap-4 md:mt-24 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <VisitorChart/>
        </div>
    </div>
  );
};

export default OwnerDashboard;
