"use client";
import { Button } from "../ui/button";
import { LuAlignLeft } from "react-icons/lu";
import { useRef, useState } from "react";
const SideNavDialog = ({ pageState, setShowSideNav, pageStateTab }) => {
  let activeTabLine = useRef();
  let sideBarIcon = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    activeTabLine.current.style.width = `${offsetWidth}px`;
    activeTabLine.current.style.transform = `translateX(${offsetLeft}px)`; 

    if (e.target == sideBarIcon.current) {
      setShowSideNav((prev) => !prev);
    } else {
      setShowSideNav(false);
    }
  };

  return (
    <div className="md:hidden gap-4 bg-white py-1  flex flex-nowrap overflow-x-hidden">
      <Button
        ref={sideBarIcon}
        variant="icon"
        size="icon"
        className="flex gap-1 ml-2  hover:bg-none  capitalize"
        onClick={changePageState}
      >
        <LuAlignLeft className="capitalize w-6 h-6 pointer-events-none " />
      </Button>
      <Button
        ref={pageStateTab}
        size="default"
        variant="icon"
        className="flex hover:bg-none  capitalize"
        onClick={changePageState}
      >
        {pageState}
      </Button>
      <hr
        className="absolute border-gray-400 bottom-0  duration-500"
        ref={activeTabLine}
      />
    </div>
  );
};

export default SideNavDialog;
