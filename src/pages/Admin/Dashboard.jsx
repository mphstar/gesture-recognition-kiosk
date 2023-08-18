import React, { useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import AdminContext from "../../utils/AdminContext";

const Dashboard = () => {
  const [IsShow, SetIsShow] = useState(false);
  return (
    <AdminContext.Provider value={{IsShow, SetIsShow}}>
      <div>
        <div className="">
          <Sidebar />
        </div>
        <div className="flex w-full md:ml-[390px] lg:ml-[290px] duration-300 ease-in-out px-4 py-4 border-b-[2px]">
          <HeaderAdmin title="Dashboard" />
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Dashboard;
