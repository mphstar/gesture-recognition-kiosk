import React, { useContext, useEffect, useRef, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import CartItem from "./CartItem";
import ItemContext from "../utils/ItemContext.js";
import { AnimatePresence } from "framer-motion";

const Cart = () => {
  const {DataCart, SetDataCart} = useContext(ItemContext);
  const CartContent = useRef(null);

  const handleQuantity = (option, key) => {
    const tempData = [...DataCart];
    if (option == "plus") {
      tempData[key].qty += 1;
    } else {
      if (tempData[key].qty == 1) {
        tempData.splice(key, 1)
      } else {
        tempData[key].qty -= 1;
      }
    }
    SetDataCart(tempData);

  };

  useEffect(() => {
  }, [DataCart]);

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
            {DataCart.map((value, index) => {
              return (
                <CartItem
                  name={value.data.name}
                  price={value.data.price}
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
      <div className="w-full h-fit px-4">
        <div className="w-full h-fit items-center flex justify-center bg-orange-500 rounded-lg px-4 py-4 text-white cursor-pointer font-bold text-center">
          Pay!
        </div>
      </div>
    </div>
  );
};

export default Cart;
