import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Sidebar from "../../../components/Sidebar";
import AdminContext from "../../../utils/AdminContext";
import { MdEditDocument, MdDelete } from "react-icons/md";
import DialogProducts from "../../../components/DialogProducts";
import useSWR, { mutate } from "swr";
import fetcher from "../../../utils/Fetcher";
import UrlServer from "../../../utils/urlServer";
import convertRupiah from "../../../utils/convertRupiah";
import Pagination from "../../../components/Pagination";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Snack = () => {
  const [IsShow, SetIsShow] = useState(false);
  const [DialogShow, SetDialog] = useState(false);
  const [OptionDialog, SetOptionDialog] = useState("Add");
  const [page, SetPage] = useState(1);
  const [limit, SetLimit] = useState(6);
  const [search, SetSearch] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [dataSelected, SetDataSelected] = useState();
  const [category, SetCategory] = useState(1)

  useEffect(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, [page]);

  const refreshPage = () => {
    SetPage(1);
    SetSearch("");
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.products.snack.data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const url = `${UrlServer}/api/getProduct?page=${page}&limit=${limit}&search=${search}`;

  const { data, isLoading, error } = useSWR(url, fetcher);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Question?",
      text: `Are you sure to Delete Data?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading",
          html: '<div class="body-loading"><div class="loadingspinner"></div></div>', // add html attribute if you want or remove
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        const result = await fetch(`${UrlServer}/api/product/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: item.id, image_path: item.image }), // Ganti dengan data yang ingin Anda kirim
        });

        if (result.ok) {
          Swal.fire("Success", `Delete Data Success`, "success").then(() => {
            mutate(url);
            SetDialog(false);
          });
        } else {
          Swal.fire("Failed", `Delete Data Failed`, "error").then(() => {
            mutate(url);
            SetDialog(false);
          });
        }
      }
    });
  };

  const handleDeleteSelection = () => {
    if (selectedRows.length == 0) {
      Swal.fire("Information", `Select One Data or More First`, "warning");
    } else {
      Swal.fire({
        title: "Question?",
        text: `Are you sure to Delete Data?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Loading",
            html: '<div class="body-loading"><div class="loadingspinner"></div></div>', // add html attribute if you want or remove
            allowOutsideClick: false,
            showConfirmButton: false,
          });

          const result = await fetch(
            `${UrlServer}/api/product/deleteSelection`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: selectedRows }), // Ganti dengan data yang ingin Anda kirim
            }
          );

          if (result.ok) {
            Swal.fire("Success", `Delete Data Success`, "success").then(() => {
              mutate(url);
              refreshPage();
              setSelectAll(false);
              setSelectedRows([]);
              SetDialog(false);
            });
          } else {
            Swal.fire("Failed", `Delete Data Failed`, "error").then(() => {
              mutate(url);
              refreshPage();
              setSelectAll(false);
              setSelectedRows([]);
              SetDialog(false);
            });
          }
        }
      });
    }
  };

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
        category
      }}
    >
      <DialogProducts option={OptionDialog} />
      <div className="">
        <div className="">
          <Sidebar active="Snack" />
        </div>
        <div className="flex flex-col w-full md:pl-[320px] lg:pl-[290px] min-h-screen duration-300 ease-in-out">
          <HeaderAdmin title="Products" />
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
                <li>
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
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Products
                    </a>
                  </div>
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
                      Snack
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
              <div className="flex flex-row gap-2 cursor-default mt-4 md:mt-0">
                <div
                  onClick={() => {
                    handleDeleteSelection();
                  }}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded-md items-center justify-center"
                >
                  <p>Delete</p>
                </div>
                <div
                  onClick={() => {
                    SetOptionDialog("Add");
                    SetDialog(true);
                  }}
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 text-white rounded-md items-center justify-center"
                >
                  <p>Add Product</p>
                </div>
              </div>
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
                    <th className="px-4 py-4 text-center">
                      <div className="">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectAll}
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
                    ) : data.products.snack.data.length == 0 ? (
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
                      data.products.snack.data.map((item, index) => {
                        return (
                          <motion.tr
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            key={item.id}
                          >
                            <td className="px-4 w-16 text-center">
                              <div className="">
                                <input
                                  className="h-4 w-4"
                                  type="checkbox"
                                  onChange={() => handleCheckboxChange(item.id)}
                                  checked={selectedRows.includes(item.id)}
                                  name=""
                                  id=""
                                />
                              </div>
                            </td>
                            <td className="text-left px-4 py-2">
                              <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                                <div className="w-16 h-16">
                                  <img
                                    className="w-full h-full object-contain"
                                    src={`${UrlServer}/uploads/${item.image}`}
                                    alt="snack"
                                  />
                                </div>
                                <div>{item.name}</div>
                              </div>
                            </td>
                            <td className="text-left px-4">
                              {convertRupiah.formatPrice(item.price)}
                            </td>
                            <td className="text-left px-4">
                              {item.description}
                            </td>
                            <td className="px-4">
                              <div className="flex flex-row gap-2">
                                <div
                                  onClick={() => {
                                    SetOptionDialog("Update");
                                    SetDataSelected(item);
                                    SetDialog(true);
                                  }}
                                  className="flex bg-orange-400 px-3 py-3 rounded-md"
                                >
                                  <MdEditDocument color="white" />
                                </div>
                                <div
                                  onClick={() => {
                                    handleDelete(item);
                                  }}
                                  className="flex bg-red-600 px-3 py-3 rounded-md"
                                >
                                  <MdDelete color="white" />
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
                total={!data ? 0 : data.products.snack.total_data}
                showItem={!data ? 0 : data.products.snack.data.length}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Snack;
