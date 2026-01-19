import React from "react";
import PhoneFooter from "../components/PhoneFooter";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationActive } from "../features/ui/uiSlice";

function Notification() {
  const inNotificationIsActive = useSelector(
    (state) => state.ui.inNotificationIsActive
  );
  const dispatch = useDispatch();

  return (
    <div className="h-full border-[0_1px_0_1px] border-(--border-color) flex flex-col pb-50 relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* header */}

      <div className="h-fit w-full flex flex-col items-center sticky shrink-0 top-0 bg-black/50 backdrop-blur-lg z-2">
        <div className="h-[7vh] w-[95%] flex justify-between items-center">
          <div className="text-md md:text-lg font-bold text-(--current-color)">
            <span>Notifications</span>
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
        <div className="h-[5vh] sm:h-[7vh] w-full flex border-[0_0_1px_0] border-(--border-color)">
          <div
            onClick={() => {
              dispatch(setNotificationActive("all"));
            }}
            className="h-full w-[50%] hover:bg-(--hover-color) flex justify-center items-end cursor-pointer"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inNotificationIsActive === "all"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.9rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>All</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setNotificationActive("verified"));
            }}
            className="h-full w-[50%] hover:bg-(--hover-color) flex justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inNotificationIsActive === "verified"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.9rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>Verified</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setNotificationActive("mentions"));
            }}
            className="h-full w-[50%] hover:bg-(--hover-color) flex justify-center items-end cursor-pointer group"
          >
            <div
              className={`sm:h-full h-[75%] w-fit ${
                inNotificationIsActive === "mentions"
                  ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                  : `text-neutral-500`
              } font-semibold text-[0.9rem] sm:text-[1rem] grid place-content-center`}
            >
              <span>Mentions</span>
            </div>
          </div>
        </div>
      </div>

      {/* notifications */}

      <div className="h-full w-full flex flex-col justify-center items-center text-(--current-color)">
        <span className="animate-bounce text-xl md:text-3xl">Oops!</span>
        <span className="text-sm md:text-md text-center italic font-semibold">
          No notifications so far, check again later!
        </span>
      </div>

      {/* footer for phone */}

      <PhoneFooter />
    </div>
  );
}

export default Notification;
