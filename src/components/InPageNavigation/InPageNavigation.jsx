"use client";

import { useEffect, useRef, useState } from "react";

const InPageNavigation = ({
  children,
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
}) => {
  let activeTabLinRef = useRef();
  let activeTabRef = useRef();
  let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLinRef.current.style.width = offsetWidth + "px";
    activeTabLinRef.current.style.left = offsetLeft + "px";

    setInPageNavIndex(i);
  };

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, [defaultActiveIndex]);
  return (
    <>
      <div className="relative container mb-8 bg-white  border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveIndex ? activeTabRef : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black " : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : "")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr
          ref={activeTabLinRef}
          className="absolute bottom-0 duration-300 bg-black "
        />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
