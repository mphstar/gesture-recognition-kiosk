import React, { useContext } from "react";
import { HiBars3 } from "react-icons/hi2";
import AdminContext from "../utils/AdminContext";

const HeaderAdmin = ({ title }) => {
  const {IsShow, SetIsShow} = useContext(AdminContext);
  return (
    <div className="flex flex-row items-center gap-3 h-fit bg-white w-full py-6 px-6 md:px-12 border-b-[2px] sticky top-0 z-[90]">
      <div onClick={() => SetIsShow(true)} className="md:hidden p-2">
        <HiBars3 />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default HeaderAdmin;
