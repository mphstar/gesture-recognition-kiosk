import React from "react";
import { motion } from "framer-motion";

const BackgroundModal = ({ onClick, isShow }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-black top-0 left-0 fixed ${
        isShow ? "pointer-events-auto" : "pointer-events-none"
      } z-[10] w-full h-full lg:hidden`}
      initial={{ opacity: 0 }}
      variants={{
        open: { opacity: 0.4 },
        closed: { opacity: 0 },
      }}
      animate={isShow ? 'open' : 'closed'}
      transition={{ duration: 1, ease: 'easeInOut' }}
    ></motion.div>
  );
};

export default BackgroundModal;
