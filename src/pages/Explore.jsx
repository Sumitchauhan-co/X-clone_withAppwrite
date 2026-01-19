import React from "react";
import TodaysNews from "../components/TodaysNews";
import Whatshappening from "../components/Whatshappening";
import WhoToFollow from "../components/WhoToFollow";
import PhoneFooter from "../components/PhoneFooter";
import { useSelector, useDispatch } from "react-redux";
import { setExploreActive } from "../features/ui/uiSlice";

const Explore = () => {
  const inExploreIsActive = useSelector((state) => state.ui.inExploreIsActive);
  const dispatch = useDispatch();

 // optimise : use map to list ul

  return (
    <div className="h-full border-[0_1px_0_1px] border-(--border-color) flex flex-col pb-50 relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* header */}

      <div className="h-fit w-full flex flex-col sticky shrink-0 top-0 bg-black/50 backdrop-blur-lg z-2">
        <div className="h-[7vh] w-full flex justify-evenly items-center">
          <div className="h-[75%] sm:h-[85%] w-[85%] flex justify-start items-center border-(--border-color) rounded-4xl border">
            <div className="h-10 w-10 fill-neutral-500 flex justify-center items-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            </div>
            <input
              className="h-full w-full border-none outline-none text-[0.9rem]"
              type="text"
              placeholder="Search"
            />
          </div>

          <div className="h-full w-[5%] grid place-content-center">
            <div className="h-8 w-8 fill-(--current-color) grid place-content-center hover:bg-neutral-900 rounded-[50%] ">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4.5 w-4.5">
                <g>
                  <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="h-[5vh] sm:h-[7vh] w-full flex border-[0_0_1px_0] border-(--border-color) overflow-hidden overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div
            onClick={() => {
              dispatch(setExploreActive("for you"));
            }}
            className="h-full w-20 sm:w-[20%] hover:bg-(--hover-color) flex shrink-0 justify-center items-end cursor-pointer"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inExploreIsActive === "for you"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.8rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>For you</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setExploreActive("trending"));
            }}
            className="h-full w-20 md:w-[20%] hover:bg-(--hover-color) flex shrink-0 justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inExploreIsActive === "trending"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.8rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>Trending</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setExploreActive("news"));
            }}
            className="h-full w-20 md:w-[20%] hover:bg-(--hover-color) flex shrink-0 justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inExploreIsActive === "news"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.8rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>News</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setExploreActive("sports"));
            }}
            className="h-full w-20 md:w-[20%] hover:bg-(--hover-color) flex shrink-0 justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inExploreIsActive === "sports"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.8rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>Sports</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setExploreActive("entertainment"));
            }}
            className="h-full w-20 md:w-[20%] hover:bg-(--hover-color) flex shrink-0 justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inExploreIsActive === "entertainment"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.8rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>Entertainment</span>
            </div>
          </div>
        </div>
      </div>

      {/* TodaysNews */}

      <TodaysNews isReq={true} />

      {/* Whats happening */}

      <Whatshappening isReq={true} />

      {/* Who to follow */}

      <WhoToFollow isReq={true} />

      {/* Footer for phone */}

      <PhoneFooter />
    </div>
  );
};

export default Explore;
