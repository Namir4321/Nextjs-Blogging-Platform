"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { LuFileSignature } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import SideNavDialog from "@/components/Dashboard/SideNavDialog";
const SideNav = () => {
  let page = location.pathname.split("/")[2];
  let pageStateTab = useRef();

  let [pageState, setPageState] = useState(page?page.replace("-", " "):"edit profile");
  let [showSideNav, setShowSideNav] = useState(false);
  useEffect(() => {
    pageStateTab.current.click();
    setShowSideNav(false);
  }, [pageState]);
  return (
    <div className="relative flex bg-white gap-10 py-0 m-0 max-md:flex-col">
      <div className="sticky top-[80px] z-30">
        <div className="md:hidden bg-white py-1  border-gray-100 flex flex-nowrap overflow-x-auto">
          <SideNavDialog
            pageState={pageState}
            setShowSideNav={setShowSideNav}
            showSideNav={showSideNav}
            pageStateTab={pageStateTab}
          />
        </div>
        <div
          className={`min-w-[250px]   md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-gray-100 md:border-r absolute max-md:top-[58px] bg-white max-md:w-[calc(100%+80px]) max-md:px-1 max-md:ml-0 duration-500 ${
            showSideNav
              ? "opacity-100 pointer-events-auto"
              : "max-md:opacity-0 max-md:pointer-events-none"
          }`}
        >
          <h5 className='"text-sm text-gray-400 mb-3'>Dashboard</h5>
          <hr className="boreder-gray-100  mb-2 mr-6" />
          <Link
            href="/dashboard"
            className="sidebar-link link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <IoDocumentTextOutline />
            Blogs
          </Link>
          <Link
            href="/dashboard"
            className="sidebar-link link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <CiBellOn className="" />
            Notification
          </Link>
          <Link
            href="/dashboard"
            className="sidebar-link link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <LuFileSignature />
            Blogs
          </Link>
          <h5 className='"text-sm text-gray-400 mb-2 mt-6'>Settings</h5>
          <hr className="boreder-gray-100  mb-2 mr-6 pl-2" />
          <Link
            href="/setting/edit-profile"
            className="sidebar-link link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <MdManageAccounts />
            Edit Profile
          </Link>
          <Link
            href="/setting/change-password"
            className="sidebar-link link"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <CiLock />
            change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
