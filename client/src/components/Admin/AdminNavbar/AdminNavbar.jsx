import React from 'react'

function AdminNavbar() {
  return (
   
    <div className="flex flex-col sm:w-[260px] h-auto  items-start pt-0 pb-[2013.94px] px-0 relative bg-gray-100">
      <div className="flex flex-col sm:w-[260px] items-start pt-0 pb-[60px] px-0 relative flex-[0_0_auto] mb-[-725.49px]">
        <div className="flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="justify-between pr-4 sm:pr-[3.81e-06px] pl-0 py-4 sm:py-[20px] flex w-[188px] sm:w-full items-center relative flex-[0_0_auto]">
            <div className="justify-center pl-4 sm:pl-[16px] pr-0 py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
              <div className="gap-[8px] inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <div className="[font-family:'Ubuntu-Bold',Helvetica] font-bold text-[#3e4b5b] text-[14px] sm:text-base leading-[14px] relative w-fit mt-[-1.00px] tracking-[0] whitespace-nowrap">
                    Admin Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full bg-black h-[2px] '></div>
       
        <div className="bg-white shadow-[0px_4px_4px_#00000040] flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
          Dashboard
        </div>
        <div className="flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
          Seller Management
        </div>
        <div className="flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
         Property Management
        </div>
        <div className="flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
          Request Management
        </div>
        <div className="flex flex-col items-start sm:px-[36px] px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
         User Management
        </div>
      </div>
    </div>

  )
}

export default AdminNavbar