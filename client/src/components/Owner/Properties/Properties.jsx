import React from "react";


const Properties = () => {

    return (

      <div className="ms-64 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black ">
            Top Products
          </h4>
        </div>
  
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
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
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Details</p>
          </div>
        </div>
  
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className=" h-12 w-16 rounded-md">
                <img  src='' alt="Product" />
              </div>
              <p className="text-sm text-black ">
                Apple Watch Series 7
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">Electronics</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">$269</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">22</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">$45</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Properties;
  
