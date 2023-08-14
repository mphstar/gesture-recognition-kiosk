import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

const Items = ({ image, name, desc, price, onclick }) => {
  return (
    <motion.div onClick={onclick} key={name}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="h-fit w-full flex flex-col relative pt-20 group cursor-default"
    >
      <img
        className={`absolute top-0 h-32 w-36 object-contain translate-x-[50%] right-[50%] group-hover:-translate-y-5 duration-500`}
        src={image}
        alt="burger"
      />
      <div className={`bg-white group-hover:border-orange-500 border-[2px] w-full h-fit px-4 pt-12 group-hover:pt-8 duration-500 rounded-lg`}>
        <h1 className="font-bold line-clamp-1">{name}</h1>
        <p className="text-xs line-clamp-3">{desc}</p>
        <div className="w-full h-fit flex items-center justify-between py-4">
          <p className="font-bold text-orange-500">{price}</p>
          <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center">
            <p>
              <AiOutlinePlus color="white" />
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Items;
