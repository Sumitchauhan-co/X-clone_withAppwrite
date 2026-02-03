import React from "react";
import ForYouPost from "../components/ForYouPost";
import FollowingPost from "../components/FollowingPost";
import PhoneFooter from "../components/PhoneFooter";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHomeActive } from "../features/ui/uiSlice";
import PostBox from "../components/PostBox";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authThunk";

const Home = () => {
  const scrollRef = useRef(null);

  const inHomeIsActive = useSelector((state) => state.ui.inHomeIsActive);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const initial = user?.name?.[0]?.toUpperCase();

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const navigate = useNavigate()

  const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate("/login", { replace: true });
    };

  return (
    <div
      ref={scrollRef}
      className="h-full border-[0_1px_0_1px] border-(--border-color) flex flex-col pb-50 relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* header for only phone */}

      <div className="h-[7vh] group flex justify-center items-center sm:hidden fill-[#cecece] relative shrink-0 z-3" tabIndex="0">
        <div className="h-6 w-6 border rounded-[50%] grid place-content-center bg-[#84c346] text-[#eaeaea] text-sm absolute top-3 left-3 cursor-pointer">
          <span>{initial}</span>
        </div>
        <div className="h-fit w-65 invisible group-focus-within:visible group-active-within:visible fixed z-2 left-3 bottom-12 flex flex-col justify-center rounded-2xl transition-all duration-700 ease-out transform translate-y-0 text-white sm:text-sm font-bold bg-black shadow-white shadow-[0_0_7px_rgba(0,0,0,0.05)] animate-pulse">
          <div className="h-10 pl-5 mt-3 w-full flex justify-start items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color)">
            <span>Add an existing account</span>
          </div>
          <div
            onClick={handleLogout}
            className="h-10 pl-5 mb-3 w-full flex justify-start items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color)"
          >
            <span>Log out</span>
          </div>
          {/* <div className="w-full flex justify-center items-center relative">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="absolute h-3 w-3 invert rotate-180 -bottom-2.25"
            >
              <g>
                <path d="M22 17H2L12 6l10 11z"></path>
              </g>
            </svg>
          </div> */}
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
          className="h-full w-[50%] hover:bg-(--bg-secondary-color) active:bg-(--bg-secondary-color) flex justify-center items-end cursor-pointer"
        >
          <div
            className={`sm:h-full h-[75%] w-fit ${
              inHomeIsActive === "for you"
                ? `text-(--current-color) border-[0_0_5px_0] border-[#1D9Bf0]`
                : `text-neutral-500`
            } font-semibold text-[0.9rem] sm:text-[1rem] flex justify-start items-center`}
          >
            <span>For you</span>
          </div>
        </div>
        <div
          onClick={() => {
            resetScroll();
            dispatch(setHomeActive("following"));
          }}
          className="h-full w-[50%] hover:bg-(--bg-secondary-color) active:bg-(--bg-secondary-color) flex justify-center items-end cursor-pointer group"
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

      <PostBox />

      {/* Post */}

      <ForYouPost />
      <FollowingPost />

      {/* post icon in phone */}

      <NavLink
        to={"/post"}
        className="h-12 w-12 fixed sm:hidden bottom-15 right-5 bg-blue-400 rounded-[50%] flex justify-center items-center opacity-90 shadow-2xl shadow-white/50"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 invert">
          <g>
            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
          </g>
        </svg>
      </NavLink>

      {/* footer for only phone */}

      <PhoneFooter />
    </div>
  );
};

export default Home;
