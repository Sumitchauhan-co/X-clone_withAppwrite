import React from "react";
import TodaysNews from "../components/TodaysNews";
import { Link, NavLink, useLocation } from "react-router-dom";
import Whatshappening from "../components/Whatshappening";
import WhoToFollow from "../components/WhoToFollow";

const Section3 = () => {
  const location = useLocation();
  const isExploreActive = location.pathname === "/explore";
  const isNotificationActive = location.pathname === "/notification";
  const isFollowActive = location.pathname === "/follow";

  return (
    <div className="h-full w-[90%] xl:w-[67%] hidden lg:flex flex-col gap-3 ml-[5%] pb-25 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* search bar */}

      {!isExploreActive && (
        <div className="h-[6vh] w-full flex justify-center items-center mt-1">
          <div className="h-full w-full flex justify-start items-center border-(--border-color) rounded-4xl border">
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
        </div>
      )}

      {/* todays news */}

      {isExploreActive && (
        <div className="h-px w-full border border-(--border-color) mt-3"></div>
      )}

      {!isNotificationActive && !isFollowActive && <TodaysNews isReq={false} />}

      {/* whats happening */}

      {!isExploreActive && <Whatshappening isReq={false} />}

      {/* who to follow */}

      {!isFollowActive && <WhoToFollow isReq={false} />}

      {/* footer */}

      <div className="h-fit w-full flex flex-wrap pl-5">
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">
            Terms of Service
          </span>
          <span className="pl-2 pr-2">|</span>
        </div>
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">
            Privacy Policy
          </span>
          <span className="pl-2 pr-2">|</span>
        </div>
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">
            Cookie Policy
          </span>
          <span className="pl-2 pr-2">|</span>
        </div>
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">
            Accessibility
          </span>
          <span className="pl-2 pr-2">|</span>
        </div>
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">Ads info</span>
          <span className="pl-2 pr-2">|</span>
        </div>
        <div className="h-5 w-fit text-neutral-500 text-[0.65rem]">
          <span className="hover:underline active:underline">More...</span>
          <span className="pl-3">&copy2025 X Corp.</span>
        </div>
      </div>
    </div>
  );
};

export default Section3;
