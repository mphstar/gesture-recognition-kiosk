import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import AdminContext from "../../utils/AdminContext";
import { MdEditDocument, MdDelete } from "react-icons/md";
import DialogProducts from "../../components/DialogProducts";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/Fetcher";
import UrlServer from "../../utils/urlServer";
import convertRupiah from "../../utils/convertRupiah";
import Pagination from "../../components/Pagination";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import DialogHistory from "../../components/DialogHistory";

const History = () => {
  const [IsShow, SetIsShow] = useState(false);
  const [DialogShow, SetDialog] = useState(false);
  const [page, SetPage] = useState(1);
  const [limit, SetLimit] = useState(6);
  const [search, SetSearch] = useState("");

  const [dataSelected, SetDataSelected] = useState();

  const refreshPage = () => {
    SetPage(1);
    SetSearch("");
  };

  const url = `${UrlServer}/api/getHistory?page=${page}&limit=${limit}&search=${search}`;

  const { data, isLoading, error } = useSWR(url, fetcher);

  return (
    <AdminContext.Provider
      value={{
        IsShow,
        SetIsShow,
        DialogShow,
        SetDialog,
        url,
        refreshPage,
        dataSelected,
        SetDataSelected,
      }}
    >
      <DialogHistory />
      <div className="">
        <div className="">
          <Sidebar active="History" />
        </div>
        <div className="flex flex-col w-full md:pl-[320px] lg:pl-[290px] min-h-screen duration-300 ease-in-out">
          <HeaderAdmin title="History" />
          <div className="h-fit flex-grow flex flex-col py-4 px-6 md:px-12 bg-gray-100">
            <nav
              className="flex mt-0 overflow-x-auto py-4"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3 mr-2.5"
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
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                      History
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex flex-col md:flex-row w-full h-fit mt-2 justify-between gap-4">
              <input
                onChange={(e) => {
                  SetPage(1);
                  SetSearch(e.target.value);
                }}
                className="py-2 px-6 border-[2px] rounded-lg outline-none w-full md:flex-1 md:max-w-[400px]"
                placeholder="Search..."
                type="text"
                value={search}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full flex flex-col bg-white flex-grow mt-8 rounded-lg px-6 py-4 border-[2px] overflow-x-auto"
            >
              <table className="border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-left w-[300px]">
                      ID Transaksi
                    </th>
                    <th className="px-4 py-4 text-left">Total Items</th>
                    <th className="px-4 py-4 text-left">Price</th>
                    <th className="px-4 py-4 text-left">Date</th>
                    <th className="px-4 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 rounded-xl">
                  {!error ? (
                    isLoading ? (
                      <>
                        <tr>
                          <td
                            className="line loading-shimmer"
                            colSpan="5'"
                          ></td>
                        </tr>
                        <tr>
                          <td
                            className="line loading-shimmer"
                            colSpan="5'"
                          ></td>
                        </tr>
                        <tr>
                          <td
                            className="line loading-shimmer"
                            colSpan="5'"
                          ></td>
                        </tr>
                      </>
                    ) : data.length == 0 ? (
                      <tr>
                        <td
                          className="py-4 text-center"
                          colSpan={5}
                          rowSpan={5}
                        >
                          Data Not Found
                        </td>
                      </tr>
                    ) : (
                      data.data.map((item, index) => {
                        return (
                          <motion.tr
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            key={item.transaction_id}
                          >
                            <td className="text-left px-4 py-3">
                              {item.transaction_id}
                            </td>
                            <td className="text-left px-4 py-3">
                              {item.total_items}
                            </td>
                            <td className="text-left px-4 py-3">
                              {convertRupiah.formatPrice(item.price)}
                            </td>
                            <td className="text-left px-4 py-3">
                              {new Date(item.datetime)
                                .toLocaleString()
                                .replace(",", "")}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-row gap-2">
                                <div
                                  onClick={() => {
                                    SetDataSelected(item);
                                    SetDialog(true);
                                  }}
                                  className="flex bg-orange-400 px-3 py-3 rounded-md"
                                >
                                  <MdEditDocument color="white" />
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )
                  ) : (
                    <tr>
                      <td className="py-4 text-center" colSpan={5} rowSpan={5}>
                        Not connected to Server
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
            {/* Pagination */}
            {isLoading || error ? undefined : (
              <Pagination
                page={page}
                SetPage={SetPage}
                total={!data ? 0 : data.total}
                showItem={!data ? 0 : data.data.length}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default History;
