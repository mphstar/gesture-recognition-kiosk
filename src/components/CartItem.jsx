import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { CgBorderStyleSolid } from "react-icons/cg";
import { motion } from "framer-motion";

const CartItem = ({ name, qty, price, image, handlePlus, handleMin }) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-row border-[2px] hover:border-orange-500 duration-500 cursor-default px-4 py-3 justify-between items-center w-full h-fit rounded-lg"
    >
      <div className="flex flex-row">
        <img className="h-12 w-12 object-contain" src={image} alt="burger" />
        <div className="flex flex-col w-full">
          <span className="font-semibold line-clamp-1">{name}</span>
          <span className="text-xs text-orange-500 font-bold line-clamp-1">
            {price}
          </span>
        </div>
      </div>
      <div className="flex flex-row w-fit h-full gap-2 items-center">
        <div
          onClick={handleMin}
          className="bg-orange-500 flex justify-center items-center h-6 w-6 rounded-full"
        >
          <p>
            <CgBorderStyleSolid color="white" />
          </p>
        </div>
        <span className="text-xs h-full">{qty}</span>
        <div
          onClick={handlePlus}
          className="bg-orange-500 flex justify-center items-center h-6 w-6 rounded-full"
        >
          <p>
            <BsPlusLg color="white" />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
