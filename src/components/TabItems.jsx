import React from "react";

const TabItems = ({image, title, isSelected, onclick}) => {
  return (
    <div onClick={onclick} className={`flex flex-col w-fit h-fit lg:w-24 lg:h-24 rounded-[35%] border-[2px] ${isSelected ? 'border-green-300' : 'border-gray-200 hover:border-orange-400'} p-1 duration-300`}>
      <div className={`w-full px-4 h-full ${isSelected ? 'bg-green-200' : 'bg-transparent'} duration-300 rounded-[35%] overflow-hidden flex flex-col items-center justify-center px-4`}>
        <div className="h-10 w-10">
            <img className="h-full w-full object-cover" src={image} alt={title} />
        </div>
        <p className={`line-clamp-1 ${isSelected ? 'font-bold' : undefined} text-xs pb-2`}>{title}</p>
      </div>
    </div>
  );
};

export default TabItems;
