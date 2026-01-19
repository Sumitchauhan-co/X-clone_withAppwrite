import React from "react";

function WhoToFollow({ isReq, heading, isDesc=false }) {
  return (
    <div
      className={`h-fit w-full border-(--border-color) ${
        !isReq ? "rounded-2xl border" : ""
      }`}
    >
      <div className="h-10 sm:h-12 w-ful p-3 flex">
        <span className={`h-full w-full text-(--current-color) ${isDesc ? "md:text-lg" : "md:text-xl"} text-lg font-bold flex justify-start items-center`}>
          {heading || "Who to follow"}
        </span>
      </div>
      <div className="h-fit w-full p-3 hover:bg-neutral-950 cursor-pointer flex justify-start items-start relative">
        <div className="h-10 w-10 border rounded-[50%] bg-amber-500"></div>
        <div className="h-full w-[90%] flex flex-col pl-2">
          <div className="h-fit w-full flex justify-start items-center text-wrap bg-auto text-(--current-color) text-sm md:text-[1rem] font-semibold">
            Lorem ipsum
          </div>
          <div className="h-fit w-full flex justify-start items-center text-wrap bg-auto text-sm md:text-[0.9rem] text-neutral-500">
            @Lorem
          </div>
          {isDesc && (<div className="h-fit w-full flex justify-start items-center text-wrap bg-auto text-(--current-color) text-sm md:text-[0.9rem]">
            Lorem ipsum dolor sit amet.
          </div>)}
        </div>
        <div className="h-8 w-20 bg-(--current-color) border rounded-2xl text-black text-[0.9rem] font-semibold flex justify-center items-center absolute right-3 hover:bg-neutral-300">
          Follow
        </div>
      </div>
    </div>
  );
}

export default WhoToFollow;
