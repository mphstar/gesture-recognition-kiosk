import React, { useContext } from "react";

import { MdFileOpen } from "react-icons/md";
import AdminContext from "../utils/AdminContext";

const DialogProducts = ({option}) => {
  const { DialogShow, SetDialog } = useContext(AdminContext);
  const handleClose = () => {
    SetDialog(false)
  }
  return (
    <>
      <div onClick={handleClose} className={`h-screen w-screen fixed bg-black ${DialogShow ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-300 ease-in-out z-[200]`}></div>
      <div className={`flex flex-col w-[90%] h-[90%] max-w-[500px] ${DialogShow ? 'scale-100' : 'scale-0'} duration-300 ease-in-out fixed bg-white z-[201] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] rounded-lg`}>
        <div className="flex w-full py-6 px-6 flex-row justify-between items-center border-b-[2px]">
          <h1 className="font-semibold">{option} Data</h1>
          <div onClick={handleClose} className="flex px-2 bg-red-600 h-fit w-fit text-white rounded-md">
            <p>x</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 py-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="outline-none px-4 py-2 border-[2px] rounded-md"
              type="text"
              name=""
              id="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="outline-none px-4 py-2 border-[2px] rounded-md h-[150px]"
              type="text"
              name=""
              id="description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <input
              className="outline-none px-4 py-2 border-[2px] rounded-md"
              type="text"
              name=""
              id="price"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Image</label>
            <div className="bg-white w-full h-[200px] border-[2px] rounded-md flex flex-col overflow-hidden relative justify-center items-center">
              <input className="h-full w-full absolute opacity-0" type="file" />
              <div className="h-12 w-12">
                <MdFileOpen className="w-full h-full" />
              </div>
              <p>Select image</p>
              <div className="w-full h-full absolute invisible">
                <img
                  className="w-full h-full object-cover"
                  src="https://picsum.photos/200/300"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-6 py-4 mb-4">
          <div className="bg-green-500 hover:bg-green-600 cursor-default w-full py-3 px-4 text-white justify-center items-center rounded-md">
            <p className="text-center">{option}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogProducts;
