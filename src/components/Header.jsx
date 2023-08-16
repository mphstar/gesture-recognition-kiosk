import React from "react";
import Banner from "./../assets/images/banner_university.png";

const Header = () => {
  return (
    <div className="flex flex-col text-white w-full h-fit bg-gray-500 rounded-2xl overflow-hidden relative">
      
      <div className="px-8 py-10 h-full flex flex-col justify-center z-[2]">
        <p className="font-bold text-[1.5rem] w-full">Politeknik Negeri Jember Cafeteria</p>
        <p className="">Sweet & Delicious Food</p>
      </div>
      <div className="bg-black w-full h-full flex absolute z-[1] opacity-50"></div>
      <img className="object-cover w-full h-full absolute bg-yellow-400" src={Banner} alt="Banner" />
    </div>
  );
};

export default Header;
