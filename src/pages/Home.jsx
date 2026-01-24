import React, { } from "react";
import ForYouPost from "../components/ForYouPost";
import FollowingPost from "../components/FollowingPost";
import PhoneFooter from "../components/PhoneFooter";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHomeActive } from "../features/ui/uiSlice";
import PostBox from "../components/PostBox";

const Home = () => {
  const scrollRef = useRef(null);

  const inHomeIsActive = useSelector((state) => state.ui.inHomeIsActive);
  const dispatch = useDispatch();

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-full border-[0_1px_0_1px] border-(--border-color) flex flex-col pb-50 relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* header for only phone */}

      <div className="h-[5vh] flex justify-center items-center sm:hidden fill-[#cecece] relative shrink-0 z-3">
        <div className="h-6 w-6 border rounded-[50%] grid place-content-center bg-[#84c346] text-[#eaeaea] text-sm absolute top-3 left-3 cursor-pointer">
          <span>S</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6">
          <g>
            <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
          </g>
        </svg>
      </div>

      {/* header for all devices */}

      <div className="h-[5vh] sm:h-[7vh] w-full flex border-[0_0_1px_0] border-(--border-color) sticky shrink-0 top-0 bg-black/50 backdrop-blur-lg z-2">
        <div
          onClick={() => {
            resetScroll();
            dispatch(setHomeActive("for you"));
          }}
          className="h-full w-[50%] hover:bg-(--hover-color) flex justify-center items-end cursor-pointer"
        >
          <div
            className={`sm:h-full h-[75%] w-fit ${
              inHomeIsActive === "for you"
                ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                : `text-neutral-500`
            } font-semibold text-[0.9rem] sm:text-[1rem] grid place-content-center`}
          >
            <span>For you</span>
          </div>
        </div>
        <div
          onClick={() => {
            resetScroll();
            dispatch(setHomeActive("following"));
          }}
          className="h-full w-[50%] hover:bg-(--hover-color) flex justify-center items-end cursor-pointer group"
        >
          <div
            className={`sm:h-full h-[75%] w-fit ${
              inHomeIsActive === "following"
                ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                : `text-neutral-500`
            } font-semibold text-[0.9rem] sm:text-[1rem] grid place-content-center`}
          >
            <span>Following</span>
          </div>
        </div>
      </div>

      {/* whats happening container for other than phone*/}

      <PostBox/>

      {/* Post */}

      <ForYouPost />
      <FollowingPost />

      {/* footer for only phone */}

      <PhoneFooter />
    </div>
  );
};

export default Home;
