import React, { useContext, useState } from "react";

import AdminContext from "../utils/AdminContext";
import convertRupiah from "../utils/convertRupiah";
import UrlServer from "../utils/urlServer";

const DialogHistory = () => {
  const {
    DialogShow,
    SetDialog,
    url,
    refreshPage,
    dataSelected,
    SetDataSelected,
  } = useContext(AdminContext);

  const handleClose = () => {
    SetDialog(false);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`h-screen w-screen fixed bg-black ${
          DialogShow
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } duration-300 ease-in-out z-[200]`}
      ></div>
      <div
        className={`flex flex-col w-[90%] max-h-[90%] h-fit max-w-[500px] ${
          DialogShow ? "scale-100" : "scale-0"
        } duration-300 ease-in-out fixed bg-white z-[201] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] rounded-lg`}
      >
        <div className="flex w-full py-6 px-6 flex-row justify-between items-center border-b-[2px]">
          <h1 className="font-semibold">Detail History</h1>
          <div
            onClick={handleClose}
            className="flex px-2 bg-red-600 h-fit w-fit text-white rounded-md"
          >
            <p>x</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 py-6 overflow-y-auto">
          <table className="text-xs lg:text-base">
            <tbody>
              <tr>
                <td className="font-semibold">ID Transaction</td>
                <td className="px-1">:</td>
                <td>{dataSelected?.transaction_id}</td>
              </tr>
              <tr>
                <td className="font-semibold">Date</td>
                <td className="px-1">:</td>
                <td>
                  {new Date(dataSelected?.datetime)
                    .toLocaleString()
                    .replace(",", "")}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Total Items</td>
                <td className="px-1">:</td>
                <td>{dataSelected?.total_items}</td>
              </tr>
              <tr>
                <td className="font-semibold">Price</td>
                <td className="px-1">:</td>
                <td>
                  {!dataSelected
                    ? 1000
                    : convertRupiah.formatPrice(dataSelected.price)}
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="font-bold border-b-2 py-4">Detail Transaction</h1>
          <div className="w-full h-full grid grid-cols-1 mt-4 gap-4">
            {dataSelected?.details.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-row justify-between items-center w-full gap-3"
                >
                  <div className="flex flex-row gap-6">
                    <div className="h-16 w-16 flex overflow-hidden rounded-md">
                      <img
                        className="h-full w-full object-contain"
                        src={`${UrlServer}/uploads/${item.image}`}
                        alt="image"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold line-clamp-1">{item.name}</p>
                      <p>
                        {!dataSelected
                          ? 1000
                          : convertRupiah.formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1>x{item.qty}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogHistory;
