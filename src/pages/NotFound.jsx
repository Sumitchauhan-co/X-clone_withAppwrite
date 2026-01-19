import React from "react";
import { Link, NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col gap-3 sm:gap-5 justify-center items-center text-white">
      <div className="text-3xl sm:text-5xl">
        <span>404 Not Found</span>
      </div>
      <NavLink to={`/x-clone/home`} className={`flex flex-col`}>
        <button className="h-7 w-20 sm:h-12 sm:w-30 text-sm sm:text-[1rem] border border-(--current-color) rounded-2xl animate-pulse">
          Click here
        </button>
      </NavLink>
      <div className="text-sm sm:text-xl">
        <span>To redirect to home!</span>
      </div>
    </div>
  );
};

export default NotFound;
