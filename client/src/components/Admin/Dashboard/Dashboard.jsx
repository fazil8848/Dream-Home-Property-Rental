import React, { useEffect } from "react";
import BarChart from "../BarChart/BarChart";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "../../Dependencies/variables/ChartData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const adminInfo = useSelector((state)=> state.admin.adminInfo);
  const navigate = useNavigate()
  useEffect(()=>{
    if (!adminInfo) {
      navigate('/admin/login')
    }
  },[adminInfo])
  return (
    <>
      <div className="flex">
        <main className="flex-1 bg-gray-100 p-4">
          <h1 className="flex justify-center items-center text-3xl text-blue-100 mb-4">
            Admin Dashboard
          </h1>
          <div className="lg:w-1/2 min-h-[20rem] w-full bg-white rounded-md m-2 shadow-xl border">
            <BarChart
              chartData={barChartDataDailyTraffic}
              chartOptions={barChartOptionsDailyTraffic}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
