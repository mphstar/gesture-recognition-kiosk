import React, { useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import AdminContext from "../../utils/AdminContext";
import Snack from "../../assets/images/doritos.png";
import Drink from "../../assets/images/pocari.png";
import Dessert from "../../assets/images/Fantasy-Jeruk.png";
import ReactApexChart from "react-apexcharts";

import Snack1 from "../../assets/images/slai-olai.png";
import { Link } from "react-router-dom";

import useSWR, { mutate } from "swr";
import fetcher from "../../utils/Fetcher";
import UrlServer from "../../utils/urlServer";

const Dashboard = () => {
  const [IsShow, SetIsShow] = useState(false);

  const url = `${UrlServer}/api/dashboard`;

  const { data, isLoading, error } = useSWR(url, fetcher);

  const chart = {
    series: !data
      ? [0, 0, 0]
      : [data.category.snack, data.category.drink, data.category.icecream],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Snack", "Drink", "Icecream"],
      legend: {
        position: "bottom",
      },
      colors: ["#FF5733", "#36A2EB", "#FFC300"],
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
    },
  };

  if (isLoading) {
    return (
      <div
        id="loading"
        className="fixed w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-slate-50 z-[99999]"
      >
        <div className="loadingspinner"></div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ IsShow, SetIsShow }}>
      <div className="">
        <div className="">
          <Sidebar active="Dashboard" />
        </div>
        <div className="flex flex-col w-full md:pl-[320px] lg:pl-[290px] min-h-screen duration-300 ease-in-out">
          <HeaderAdmin title="Dashboard" />
          <div className="h-fit flex-grow flex flex-col py-4 px-6 md:px-12 bg-gray-100">
            <p className="h-fit text-xl font-bold mt-4">List Products</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-fit mt-6 gap-4">
              <Link
                to={"/products/snack"}
                className="bg-white rounded-lg w-full h-[250px] lg:h-[200px] flex items-center px-4 py-8 border-[2px] hover:border-orange-600 duration-300 ease-in-out relative"
              >
                <div className="flex flex-col lg:flex-row gap-2 w-full items-center">
                  <div className="w-20 lg:w-40 h-fit">
                    <img
                      className="w-full h-full object-cover"
                      src={Snack}
                      alt="snack"
                    />
                  </div>
                  <div className="flex flex-row w-full justify-center lg:justify-between items-center px-4">
                    <div className="flex flex-col justify-center items-center lg:items-start">
                      <h1 className="text-[30px] font-extrabold">Snack</h1>
                      <p className="font-semibold">{data?.count.snack}</p>
                    </div>
                    <div className="flex items-center px-3 justify-center absolute top-4 right-4 h-fit py-2 rounded-md">
                      <p>{"="}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to={"/products/drink"}
                className="bg-white rounded-lg w-full h-[250px] lg:h-[200px] flex items-center px-4 py-8 border-[2px] hover:border-orange-600 duration-300 ease-in-out relative"
              >
                <div className="flex flex-col lg:flex-row gap-2 w-full items-center">
                  <div className="w-20 lg:w-40 h-fit">
                    <img
                      className="w-full h-full object-cover"
                      src={Drink}
                      alt="Drink"
                    />
                  </div>
                  <div className="flex flex-row w-full justify-center lg:justify-between items-center px-4">
                    <div className="flex flex-col justify-center items-center lg:items-start">
                      <h1 className="text-[30px] font-extrabold">Drink</h1>
                      <p className="font-semibold">{data?.count.drink}</p>
                    </div>
                    <div className="flex items-center px-3 justify-center absolute top-4 right-4 h-fit py-2 rounded-md">
                      <p>{"="}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to={"/products/icecream"}
                className="bg-white rounded-lg w-full h-[250px] lg:h-[200px] flex items-center px-4 py-8 border-[2px] hover:border-orange-600 duration-300 ease-in-out relative"
              >
                <div className="flex flex-col lg:flex-row gap-2 w-full items-center">
                  <div className="w-20 lg:w-40 h-fit">
                    <img
                      className="w-full h-full object-cover"
                      src={Dessert}
                      alt="Dessert"
                    />
                  </div>
                  <div className="flex flex-row w-full justify-center lg:justify-between items-center px-4">
                    <div className="flex flex-col justify-center items-center lg:items-start">
                      <h1 className="text-[30px] font-extrabold">Icecream</h1>
                      <p className="font-semibold">{data?.count.icecream}</p>
                    </div>
                    <div className="flex items-center px-3 justify-center absolute top-4 right-4 h-fit py-2 rounded-md">
                      <p>{"="}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mt-8">
              <div className="flex flex-col col-span-2">
                <h1 className="text-xl font-bold py-2 mb-4">Best Seller</h1>
                <div className="flex w-full h-full lg:max-h-[400px] bg-white border-[2px] lg:overflow-y-auto px-4 py-4 items-start justify-start rounded-lg overflow-x-auto">
                  <table className="h-fit w-full border-spacing-y-2 border-separate">
                    <thead className="">
                      <tr>
                        <th className="px-4 bg-gray-100 py-4 text-left w-[100px]">
                          Image
                        </th>
                        <th className="px-4 bg-gray-100 py-4 text-left">
                          Product
                        </th>
                        <th className="px-4 bg-gray-100 py-4 text-left">
                          Category
                        </th>
                        <th className="px-4 bg-gray-100 py-4 text-left">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data?.best_seller.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-4 pt-3">
                              <div className="w-[50px] h-[50px] overflow-hidden rounded-xl">
                                <img
                                  className="w-full h-full object-cover"
                                  src={`${UrlServer}/uploads/${item[4]}`}
                                  alt="image"
                                />
                              </div>
                            </td>
                            <td className="px-4">{item[1]}</td>
                            <td className="px-4">
                              {item[5] == 1
                                ? "Snack"
                                : item[5] == 2
                                ? "Drink"
                                : "Ice Cream"}</td>
                            <td className="px-4">{item[10]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold py-2 mb-4">Products Sold</h1>
                <div className="flex w-full bg-white justify-center items-center h-[400px] rounded-lg border-[2px]">
                  <ReactApexChart
                    options={chart.options}
                    series={chart.series}
                    type="pie"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Dashboard;
