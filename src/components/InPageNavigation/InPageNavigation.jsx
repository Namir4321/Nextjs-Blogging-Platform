"use client";

import { useEffect, useRef, useState } from "react";
export let activeTabLinRef;
export let activeTabRef;
const InPageNavigation = ({
  children,
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
}) => {
  activeTabLinRef = useRef();
  activeTabRef = useRef();
  let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  let [width, setWidth] = useState(window.innerWidth);
  let [isResizeEventAdded, setIsResizeEventAdded] = useState(false);
  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLinRef.current.style.width = offsetWidth + "px";
    activeTabLinRef.current.style.left = offsetLeft + "px";
    setInPageNavIndex(i);
  };

  useEffect(() => {
    if (width > 766 && inPageNavIndex !== defaultActiveIndex) {
      changePageState(activeTabRef.current, defaultActiveIndex);
    }
    if (!isResizeEventAdded) {
      window.addEventListener("resize", () => {
        if (!isResizeEventAdded) {
          setIsResizeEventAdded(true);
        }
        setWidth(window.innerWidth);
      });
    }
  }, [defaultActiveIndex, width]);
  return (
    <>
      <div className="relative container mb-8 bg-white dark:bg-background   border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveIndex ? activeTabRef : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black dark:text-white " : "text-dark-grey ") +
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
