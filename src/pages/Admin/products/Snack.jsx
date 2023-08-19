import React, { useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Sidebar from "../../../components/Sidebar";
import AdminContext from "../../../utils/AdminContext";
import { MdEditDocument, MdDelete } from "react-icons/md";
import Snack1 from "../../../assets/images/doritos.png";

const Snack = () => {
  const [IsShow, SetIsShow] = useState(false);
  return (
    <AdminContext.Provider value={{ IsShow, SetIsShow }}>
      <div className="">
        <div className="">
          <Sidebar active="Snack" />
        </div>
        <div className="flex flex-col w-full md:pl-[320px] lg:pl-[290px] min-h-screen duration-300 ease-in-out">
          <HeaderAdmin title="Products" />
          <div className="h-fit flex-grow flex flex-col py-4 px-6 md:px-12 bg-gray-100">
            <nav class="flex mt-0 overflow-x-auto py-4" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      class="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <a
                      href="#"
                      class="ml-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Products
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                      Snack
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex flex-col md:flex-row w-full h-fit mt-2 justify-between gap-4">
              <input
                className="py-2 px-6 border-[2px] rounded-lg outline-none w-full md:flex-1 md:max-w-[400px]"
                placeholder="Search..."
                type="text"
              />
              <div className="flex flex-row gap-2 cursor-default mt-4 md:mt-0">
                <div className="bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded-md items-center justify-center">
                  <p>Delete</p>
                </div>
                <div className="bg-green-500 hover:bg-green-600 px-3 py-2 text-white rounded-md items-center justify-center">
                  <p>Add Product</p>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col bg-white flex-grow mt-8 rounded-lg px-6 py-4 border-[2px] overflow-x-auto">
              <table className="border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-center">
                      <div className="">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left">Name</th>
                    <th className="px-4 py-4 text-left">Price</th>
                    <th className="px-4 py-4 text-left">Description</th>
                    <th className="px-4 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 rounded-xl">
                  <tr>
                    <td className="px-4 w-16 text-center">
                      <div className="">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </div>
                    </td>
                    <td className="text-left px-4">
                      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                        <div className="w-16 h-fit">
                          <img
                            className="w-full h-full object-cover"
                            src={Snack1}
                            alt="snack"
                          />
                        </div>
                        <div>Doritos</div>
                      </div>
                    </td>
                    <td className="text-left px-4">Rp. 11.500</td>
                    <td className="text-left px-4">
                      Doritos is an American brand of flavored tortilla chips, a
                      wholly owned subsidiary of PepsiCo.
                    </td>
                    <td>
                      <div className="flex flex-row gap-2">
                        <div className="flex bg-orange-400 px-3 py-3 rounded-md">
                          <MdEditDocument color="white" />
                        </div>
                        <div className="flex bg-red-600 px-3 py-3 rounded-md">
                          <MdDelete color="white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 w-16 text-center">
                      <div className="">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </div>
                    </td>
                    <td className="text-left px-4">
                      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                        <div className="w-16 h-fit">
                          <img
                            className="w-full h-full object-cover"
                            src={Snack1}
                            alt="snack"
                          />
                        </div>
                        <div>Doritos</div>
                      </div>
                    </td>
                    <td className="text-left px-4">Rp. 11.500</td>
                    <td className="text-left px-4">
                      Doritos is an American brand of flavored tortilla chips, a
                      wholly owned subsidiary of PepsiCo.
                    </td>
                    <td>
                      <div className="flex flex-row gap-2">
                        <div className="flex bg-orange-400 px-3 py-3 rounded-md">
                          <MdEditDocument color="white" />
                        </div>
                        <div className="flex bg-red-600 px-3 py-3 rounded-md">
                          <MdDelete color="white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 w-16 text-center">
                      <div className="">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </div>
                    </td>
                    <td className="text-left px-4">
                      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                        <div className="w-16 h-fit">
                          <img
                            className="w-full h-full object-cover"
                            src={Snack1}
                            alt="snack"
                          />
                        </div>
                        <div>Doritos</div>
                      </div>
                    </td>
                    <td className="text-left px-4">Rp. 11.500</td>
                    <td className="text-left px-4">
                      Doritos is an American brand of flavored tortilla chips, a
                      wholly owned subsidiary of PepsiCo.
                    </td>
                    <td>
                      <div className="flex flex-row gap-2">
                        <div className="flex bg-orange-400 px-3 py-3 rounded-md">
                          <MdEditDocument color="white" />
                        </div>
                        <div className="flex bg-red-600 px-3 py-3 rounded-md">
                          <MdDelete color="white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full h-fit flex flex-col md:flex-row mt-8 justify-center items-center md:justify-between gap-2 mb-4">
              <div>
                Showing <span className="font-bold">6</span> From{" "}
                <span className="font-bold">26</span> Data
              </div>
              <div className="flex flex-row gap-1">
                <div className="flex px-3 py-1 bg-orange-400 text-white rounded-md border-[2px]">
                  1
                </div>
                <div className="flex px-3 py-1 bg-white hover:bg-gray-100 rounded-md border-[2px]">
                  2
                </div>
                <div className="flex px-3 py-1 bg-white hover:bg-gray-100 rounded-md border-[2px]">
                  3
                </div>
                <div className="flex px-3 py-1 bg-white hover:bg-gray-100 rounded-md border-[2px]">
                  4
                </div>
                <div className="flex px-3 py-1 bg-white hover:bg-gray-100 rounded-md border-[2px]">
                  {">"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Snack;
