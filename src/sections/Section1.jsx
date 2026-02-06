import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authThunk";
import { useSelector } from "react-redux";

const Section1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const initial = user?.name?.[0]?.toUpperCase();
  const username = user?.name;
  const userId = user?.$id?.toUpperCase().toString().substring(0, 10) + ".....";

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-full sm:flex justify-end hidden">
      <div className="w-[70%] h-full flex justify-start flex-col relative">
        {/* logo */}

        <div className="h-[7vh] w-full pl-3 flex justify-start items-center">
          <div className="h-12 w-12 fill-(--current-color) border rounded-[50%] hover:bg-(--bg-secondary-color) active:bg-(--bg-secondary-color) grid place-content-center cursor-pointer">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-7 w-7">
              <g>
                <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
              </g>
            </svg>
          </div>
        </div>

        {/* sidebar container */}

        <ul className="h-[67vh] flex flex-col justify-start list-none">
          <li className="h-[10%] w-full group cursor-pointer">
            <NavLink
              to={`/home`}
              className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5"
            >
              {({ isActive }) => (
                <>
                  <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                    {isActive ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`h-fit w-fit text-(--current-color) ${
                      isActive ? "font-bold" : ""
                    } text-xl p-[0_20px_0_17px] hidden xl:block`}
                  >
                    Home
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <NavLink
              to={`/explore`}
              className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5"
            >
              {({ isActive }) => (
                <>
                  <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                    {isActive ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`h-fit w-fit text-(--current-color) ${
                      isActive ? "font-bold" : ""
                    } text-xl p-[0_20px_0_17px] hidden xl:block`}
                  >
                    Explore
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <NavLink
              to={`/notification`}
              className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5"
            >
              {({ isActive }) => (
                <>
                  <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                    {isActive ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`h-fit w-fit text-(--current-color) ${
                      isActive ? "font-bold" : ""
                    } text-xl p-[0_20px_0_17px] hidden xl:block`}
                  >
                    Notifications
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <NavLink
              to={`/follow`}
              className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5"
            >
              {({ isActive }) => (
                <>
                  <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                    {isActive ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M21 5v3h3v2h-3v3h-2v-3h-3V8h3V5h2zM10 2C7.791 2 6 3.79 6 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4zm0 9c-2.352 0-4.373.85-5.863 2.44-1.477 1.58-2.366 3.8-2.632 6.46l-.11 1.1h17.21l-.11-1.1c-.266-2.66-1.155-4.88-2.632-6.46C14.373 11.85 12.352 11 10 11z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                        <g>
                          <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`h-fit w-fit text-(--current-color) ${
                      isActive ? "font-bold" : ""
                    } text-xl p-[0_20px_0_17px] hidden xl:block`}
                  >
                    Follow
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                  <g>
                    <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                Chat
              </span>
            </div>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 33 32" aria-hidden="true" class="">
                  <g>
                    <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                Grok
              </span>
            </div>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                  <g>
                    <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                Communities
              </span>
            </div>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                  <g>
                    <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                Premium
              </span>
            </div>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                  <g>
                    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                Profile
              </span>
            </div>
          </li>
          <li className="h-[10%] w-full group cursor-pointer">
            <div className="h-full w-fit group-hover:bg-(--bg-secondary-color) group-active:bg-(--bg-secondary-color) flex items-center justify-start rounded-[25px] pl-5">
              <div className="h-6 w-6 fill-(--current-color) flex items-center justify-start">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                  <g>
                    <path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path>
                  </g>
                </svg>
              </div>
              <span className="h-fit w-fit text-(--current-color) text-xl p-[0_20px_0_17px] hidden xl:block">
                More
              </span>
            </div>
          </li>
        </ul>

        {/* post  button */}

        <div className="h-[8vh] xl:w-auto w-[8vh] flex justify-start items-center mt-2 xl:ml-0 ml-2">
          <div className="xl:h-[90%] h-[80%] w-[80%] xl:w-[85%] border rounded-[50%] xl:rounded-3xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-200 flex justify-center items-center cursor-pointer">
            <span className="text-black text-[1rem] sm:text-lg font-semibold xl:block hidden">
              Post
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="h-6 w-6 xl:hidden block"
            >
              <g>
                <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
              </g>
            </svg>
          </div>
        </div>

        {/* user profile */}

        <div className="h-[9vh] w-[95%] hover:bg-(--bg-secondary-color) active:bg-(--bg-secondary-color) absolute bottom-0 border rounded-4xl lg:p-3 p-0 lg:ml-0 m-3 cursor-pointer">
          <div className="h-full w-full group flex items-center" tabIndex="0">
            <div className="h-9 w-9 border rounded-[50%] grid place-content-center lg:text-xl bg-[#84c346] text-white">
              <span>{initial}</span>
            </div>
            <div className="h-full w-[70%] hidden xl:flex flex-col p-[0_15px_0_15px] overflow-hidden">
              <div className="h-[50%] text-white flex justify-start items-center font-bold text-[1.1rem]  text-nowrap">
                <span>{username}</span>
              </div>
              <div className="h-[50%] text-[#7d7d7d] flex justify-start items-center text-sm">
                <span>{userId}</span>
              </div>
            </div>
            <div className="h-[5vmin] w-[5vmin] hidden xl:flex justify-end items-center fill-(--current-color)">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5">
                <g>
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </g>
              </svg>
            </div>

            <div className="h-fit w-70 invisible group-focus-within:visible fixed z-2 left-25 bottom-25 flex flex-col justify-center rounded-2xl shadow-white shadow-[0_0_7px_rgba(0,0,0,0.05)] text-white text-sm font-bold bg-black">
              <div className="h-10 pl-5 mt-3 w-full flex justify-start items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color)">
                <span>Add an existing account</span>
              </div>
              <div
                onClick={handleLogout}
                className="h-10 pl-5 mb-3 w-full flex justify-start items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color)"
              >
                <span>Log out</span>
              </div>
              <div className="w-full flex justify-center items-center relative">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="absolute h-3 w-3 invert rotate-180 -bottom-2.25"
                >
                  <g>
                    <path d="M22 17H2L12 6l10 11z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
