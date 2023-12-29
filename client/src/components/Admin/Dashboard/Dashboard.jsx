import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { generateError } from "../../Dependencies/toast";
import {
  useGetOwnersMutation,
  useGetUsersMutation,
} from "../../../Redux/Slices/adminApi/adminApislice";

function Dashboard() {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const navigate = useNavigate();
  const [usersLength, setUsersLenght] = useState(0);
  const [ownersLength, setOwnersLenght] = useState(0);

  const [getUsersCall] = useGetUsersMutation();
  const [getOwnersCall] = useGetOwnersMutation();
  useEffect(() => {
    if (!adminInfo) {
      navigate("/admin/login");
    }
  }, [adminInfo]);

  const options = {
    chart: {
      width: 480,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        const categories = ["Owners", "Users"];
        return (
          categories[opts.seriesIndex] +
          " - " +
          opts.w.globals.series[opts.seriesIndex]
        );
      },
    },
    title: {
      text: "Gradient Donut with custom Start-angle",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const fetchUsers = async () => {
    try {
      const { users } = await getUsersCall().unwrap();
      const { owners } = await getOwnersCall().unwrap();
      setOwnersLenght(owners.length);
      setUsersLenght(users.length);
    } catch (error) {
      console.log(error);
      generateError(error.message);
    }
  };

  const series = [ownersLength, usersLength];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between gap-5 p-5 h-40">
        <div className="w-full border rounded-md h-full"></div>
        <div className="w-full border rounded-md h-full"></div>
        <div className="w-full border rounded-md h-full"></div>
      </div>
      <div className="flex justify-between p-5">
        <div id="chart" className="bg-white p-5 rounded-md shadow-xl">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={520}
          />
        </div>
        <div id="chart" className="bg-white p-5 rounded-md shadow-xl">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={520}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
