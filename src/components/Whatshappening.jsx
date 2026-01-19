import React from "react";
import { Link, NavLink } from "react-router-dom";
// import FetchContext from "../contexts/FetchContext";

function Whatshappening({ isReq }) {
  return (
    <div
      className={`h-fit w-full border-(--border-color) ${
        !isReq ? "rounded-2xl border" : "border-t border-b"
      }`}
    >
      <div className="h-10 sm:h-12 w-ful p-3 flex">
        <span className="h-full w-full text-(--current-color) text-lg md:text-xl font-bold flex justify-start items-center">
          What's happening
        </span>
      </div>
      <div className="h-20 w-full p-3 relative hover:bg-neutral-950 cursor-pointer">
        <p className="h-[25%] w-full flex justify-start items-center text-wrap text-neutral-500 text-[0.75rem] md:text-[0.8rem]">
          Lorem
        </p>
        <p className="h-[50%] w-full flex justify-start items-center text-wrap text-(--current-color) text-sm md:text-[1rem] font-semibold">
          Lorem ipsum, dolor
        </p>
        <p className="h-[25%] w-full flex justify-start items-center text-wrap text-neutral-500 text-[0.75rem] md:text-[0.8rem]">
          Lorem 
        </p>
        <div className="h-10 w-10 flex justify-end items-center fill-neutral-400 absolute right-3 top-3">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
        </div>
      </div>
      {!isReq && <Link
        to={`/x-clone/explore`}
        className="h-12 w-full p-3 hover:bg-neutral-950 rounded-b-2xl flex justify-start items-center text-blue-400 text-[0.9rem] cursor-pointer"
      >
        <span>Show more</span>
      </Link>}
    </div>
  );
}

export default Whatshappening;
