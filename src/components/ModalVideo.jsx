import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import ItemContext from "../utils/ItemContext";
import Video from "../assets/video.mp4";

const ModalVideo = () => {
  const { DialogShow, SetDialog, isPlaying, setIsPlaying, playerRef } =
    useContext(ItemContext);

  const handleClose = () => {
    SetDialog(false);
    setIsPlaying(false)
  };

  useEffect(() => {
    if(isPlaying){
      SetDialog(true)
    }

    if(!DialogShow){
      playerRef.current.seekTo(0)
    }
  }, [isPlaying, DialogShow]) 

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
        className={`flex flex-col w-[90%] max-h-[90%] h-fit max-w-[500px] lg:max-w-[50%] ${
          DialogShow ? "scale-100" : "scale-0"
        } duration-300 ease-in-out fixed bg-white z-[201] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] rounded-lg`}
      >
        <div className="flex w-full py-6 px-6 flex-row justify-between items-center border-b-[2px]">
          <h1 className="font-semibold">Video Guide</h1>
          <div
            onClick={handleClose}
            className="flex px-2 bg-red-600 h-fit w-fit text-white rounded-md"
          >
            <p>x</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 py-6 overflow-y-auto">
          <ReactPlayer ref={playerRef} playing={isPlaying} url={Video} controls width="100%" height="auto" />
        </div>
      </div>
    </>
  );
};

export default ModalVideo;
