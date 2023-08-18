import React, { useContext, useEffect, useRef, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import CartItem from "./CartItem";
import ItemContext from "../utils/ItemContext.js";
import { AnimatePresence } from "framer-motion";

import { toast } from "react-toastify";
import convertRupiah from "../utils/convertRupiah";
import Swal from "sweetalert2";
import UrlServer from "../utils/urlServer";

const Cart = () => {
  const { DataCart, SetDataCart, ShowCart, IsFocus, SetFocus } = useContext(ItemContext);
  const CartContent = useRef(null);

  const handleQuantity = (option, key) => {
    const tempData = { ...DataCart };
    if (option == "plus") {
      tempData.data[key].qty += 1;
      tempData.data[key].subtotal =
        tempData.data[key].data.price * tempData.data[key].qty;
      tempData.price += tempData.data[key].data.price;
    } else {
      tempData.price -= tempData.data[key].data.price;
      if (tempData.data[key].qty == 1) {
        tempData.data.splice(key, 1);
        tempData.total_items = tempData.data.length;
      } else {
        tempData.data[key].qty -= 1;
        tempData.data[key].subtotal =
          tempData.data[key].data.price * tempData.data[key].qty;
      }
    }
    SetDataCart(tempData);
  };

  const handlePay = () => {
    if (DataCart.data.length != 0) {
      Swal.fire({
        title: "Information",
        text: "Are you sure to confirmation transaction?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          toast.success("Payment Success", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Here send data cart to python
          SetDataCart({
            total_items: 0,
            price: 0,
            data: [],
          });

          ShowCart(false);
          SetFocus({
            ...IsFocus,
            description: "",
            focused: null,
          });
          await sendData()

        }
      });
    }
  };

  const sendData = async () => {
    const response = await fetch(`${UrlServer}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction: DataCart }), // Ganti dengan data yang ingin Anda kirim
    });

    const responseData = await response.json();
    console.log(responseData);
  };

  const handleCancel = () => {
    if (DataCart.data.length != 0) {
      Swal.fire({
        title: "Information",
        text: "Are you sure to cancel transaction?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success("Cart is cleared", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          SetFocus({
            ...IsFocus,
            description: "",
            focused: null,
          });

          SetDataCart({
            total_items: 0,
            price: 0,
            data: [],
          });

          ShowCart(false);
        }
      });
    }
  };

  useEffect(() => {}, [DataCart]);

  return (
    <div className="w-full h-full flex flex-col py-8 lg:px-6">
      {/* Cart */}
      <div
        ref={CartContent}
        className="flex flex-col flex-grow w-full overflow-y-auto px-4 mb-4 select-none scroll-cart"
      >
        <p>
          <BsCartCheck className="h-12 w-full" />
        </p>
        <p className="text-center font-semibold text-xl py-2">Your Cart</p>
        <div className="grid grid-cols-1 w-full mt-4 h-fit mb-4 gap-3">
          <AnimatePresence>
            {DataCart.data.map((value, index) => {
              return (
                <CartItem
                  name={value.data.name}
                  price={value.subtotal}
                  key={index}
                  qty={value.qty}
                  image={value.data.image}
                  handlePlus={() => handleQuantity("plus", index)}
                  handleMin={() => handleQuantity("min", index)}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      {/* Bottom */}
      <div className="flex flex-col w-full h-fit gap-2 border-t-2 px-4 lg:px-0">
        <div className="flex flex-row justify-between text-[16px] mt-4 ">
          <p>Total Item: {DataCart.total_items}</p>
          <p>Price: {convertRupiah.formatPrice(DataCart.price)}</p>
        </div>
        <div className="w-full h-fit flex flex-row justify-between gap-2">
          <div
            onClick={() => {
              handleCancel();
            }}
            className="w-full h-fit items-center flex justify-center bg-red-600 hover:bg-red-700 rounded-lg px-4 py-4 text-white cursor-pointer font-bold text-center"
          >
            Cancel
          </div>

          <div
            onClick={() => {
              handlePay();
            }}
            className="w-full h-fit items-center flex justify-center bg-green-500 hover:bg-green-600 rounded-lg px-4 py-4 text-white cursor-pointer font-bold text-center"
          >
            Pay!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
