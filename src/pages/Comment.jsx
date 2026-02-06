import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getFileUrl } from "../services/posts";
import { toggleLike } from "../features/post_likes/PostLikesThunk";
import { formatPostTime } from "../utils/time";
import {
  addComment,
  deleteComment,
  fetchComments,
} from "../features/post_comments/PostCommentsThunk";

const Comment = () => {
  const { postId } = useParams();
  const posts = useSelector((s) => s.posts.list);
  const { loading } = useSelector((s) => s.posts);
  const post = posts.find((post) => post.$id === postId);
  const dispatch = useDispatch();
  const likedPostIds = useSelector((s) => s.likes.likedPostIds);
  const isLiked =
    post && Array.isArray(likedPostIds)
      ? likedPostIds.includes(post.$id)
      : false;

  const navigate = useNavigate();
  const [reply, setReply] = useState(false);
  const [text, setText] = useState("");
  // const [file, setFile] = useState(null)
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const initial = user?.name?.[0]?.toUpperCase();
  const [reload, setReload] = useState(false);

  const { comments } = useSelector((state) => state.comments);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (c) => {
    // console.log(c, user);
    if (c.userId === user.$id) {
      dispatch(
        deleteComment({
          commentId: c.$id,
          postId: c.postId,
          commentsCount: post.commentsCount,
        }),
      );
    }
    setReload((prev) => !prev);
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0]
  //   if (!selectedFile) return
  //   setFile(selectedFile)
  // }

  const submit = () => {
    if (!text.trim()) return;

    // let mediaType = null

    // if (file && typeof file.type === "string") {
    //   if (file.type.startsWith("image/")) {
    //     mediaType = "image"
    //   } else if (file.type.startsWith("video/")) {
    //     mediaType = "video"
    //   }
    // }

    // console.log("file :", file)

    console.log(text);

    dispatch(
      addComment({
        postId: postId,
        content: text,
        // imageFile: file,
        // mediaType,
      }),
    );

    setText("");
    // setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId, dispatch, reload]);

  // console.log(likedPostIds, isLiked)

  console.log(comments);

  return (
    <>
      {
        <div className="h-full border-[0_1px_0_1px] border-(--border-color) text-(--current-color) flex flex-col pb-50 relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Header of page */}

          <div className="h-fit w-full flex flex-col items-center sticky shrink-0 top-0 bg-black/50 backdrop-blur-lg z-2">
            <div className="h-[7vh] w-full flex justify-between items-center">
              <div className="h-full w-20 sm:w-27 flex justify-between items-center text-md md:text-lg font-bold text-(--current-color)">
                <div
                  onClick={() => {
                    navigate(`/home`);
                  }}
                  className="h-8 w-8 grid place-content-center fill-(--current-color) rounded-[50%] hover:bg-(--bg-secondary-color) active:bg-(--bg-secondary-color)"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5">
                    <g>
                      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                    </g>
                  </svg>
                </div>
                <span>Post</span>
              </div>
            </div>
          </div>

          {/* post user detail */}
          <div className="h-fit w-full flex mb-2">
            <div className="sm:h-full h-[75%] min-w-[10%] flex justify-center items-start">
              <div className="min-w-10 sm:pt-2 pt-0 rounded-[50%] aspect-square bg-center flex justify-center items-center shrink">
                {post.profile ? (
                  <img src={post?.profile} alt="" />
                ) : (
                  <div className="h-6 w-6 lg:h-9 lg:w-9 border rounded-[50%] grid place-content-center lg:text-xl bg-[#84c346] text-white">
                    <span>{post.username[0].toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-fit w-full flex flex-col sm:py-2 relative gap-2">
              <div className="h-fit w-full flex flex-col">
                <div className="h-fit">
                  <span className="text-(--current-color) text-[1rem] sm:text-xl font-semibold pr-2 hover:underline active:underline">
                    {post.username}
                  </span>
                </div>
                <div className="h-fit">
                  <span className="text-neutral-500 text-[0.8rem] sm:text-[0.9rem] hover:underline active:underline">
                    {post.userId}
                  </span>
                </div>
              </div>
              <div className="h-fit w-15% flex absolute mr-2 sm:m4-1 right-0 top-0">
                <div className="h-8 w-8 sm:grid hidden rounded-[50%] place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                  <svg viewBox="0 0 33 32" aria-hidden="true" class="h-5 w-5">
                    <g>
                      <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                    </g>
                  </svg>
                </div>
                <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                  <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5">
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* media container of post */}

          <div className="h-fit w-full flex flex-col justify-center items-start pl-[5%] gap-2">
            {/* content */}
            <div className="h-fit w-full text-(--current-color) text-[1rem] sm:text-xl font-sans">
              <span>{post.content}</span>
            </div>
            {/* media */}
            {post.imageId && (
              <div className="h-fit w-[75%] flex items-center border border-(--border-color) rounded-xl">
                <div className="w-full aspect-auto overflow-hidden">
                  <a
                    href={getFileUrl(post.imageId)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.mediaType === "image" && (
                      <img
                        className="h-full w-full object-cover object-center rounded-xl"
                        src={getFileUrl(post.imageId)}
                        alt="post"
                      />
                    )}

                    {post.mediaType === "video" && (
                      <video
                        className="h-full w-full object-cover object-center rounded-xl"
                        controls
                        src={getFileUrl(post.imageId)}
                      ></video>
                    )}

                    {/*url = [ENDPOINT]/storage/buckets/[BUCKET_ID]/files/[imageId]/preview?project=[PROJECT_ID] */}
                  </a>
                </div>
              </div>
            )}
            {/* time */}
            <div className="h-fit w-full flex flex-col pb-2 relative gap-2 border-b border-b-(--border-color)">
              <div className="h-fit w-full flex flex-col">
                <div className="h-fit">
                  <span className="text-neutral-500 text-[0.8rem] sm:text-[0.9rem] hover:underline active:underline">
                    {formatPostTime(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[6vh] w-full flex justify-between items-center border-b border-b-(--border-color) pb-2">
              {/* comments */}

              <div className="h-fit w-fit flex items-center group">
                <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--bg-dark-blue-color) group-hover:fill-(--fill-blue-color) group-active:bg-(--bg-dark-blue-color) group-active:fill-(--fill-blue-color)">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="h-4.5 w-4.5"
                  >
                    <g>
                      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                    </g>
                  </svg>
                </div>
                <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--fill-blue-color) group-active:text-(--fill-blue-color) relative right-1">
                  {post.commentsCount ?? 0}
                </span>
              </div>

              <div className="h-fit w-fit flex items-center group">
                <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--repost-bg-color) group-hover:fill-(--repost-fill-color) group-active:bg-(--repost-bg-color) group-active:fill-(--repost-fill-color)">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="h-4.5 w-4.5"
                  >
                    <g>
                      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                    </g>
                  </svg>
                </div>
                <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--repost-fill-color) relative right-1">
                  0
                </span>
              </div>

              {/* likes */}

              <div
                onClick={() => {
                  dispatch(
                    toggleLike({
                      postId: post.$id,
                      likesCount: post.likesCount,
                    }),
                  );
                }}
                className="h-fit w-fit flex items-center group"
              >
                <div
                  className={`h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--like-bg-color) group-hover:fill-(--like-fill-color) group-active:bg-(--like-bg-color) group-active:fill-(--like-fill-color)`}
                >
                  {isLiked ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="h-4.5 w-4.5 fill-(--like-fill-color) transition-all duration-300 scale-125 animate-[pulse_0.5s_ease-out]"
                    >
                      <g>
                        <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4.5 w-4.5 transition-all duration-300 ease-in"
                    >
                      <g>
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                      </g>
                    </svg>
                  )}
                </div>
                <span
                  className={`text-neutral-500 text-[0.8rem] group-hover:text-(--like-fill-color) relative right-1`}
                >
                  {post.likesCount ?? 0}
                </span>
              </div>

              <div className="h-fit w-fit flex items-center group">
                <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--bg-dark-blue-color) group-hover:fill-(--fill-blue-color) group-active:bg-(--bg-dark-blue-color) group-active:fill-(--fill-blue-color)">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="h-4.5 w-4.5"
                  >
                    <g>
                      <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                    </g>
                  </svg>
                </div>
                <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--fill-blue-color) relative right-1">
                  0
                </span>
              </div>
              <div className="h-fit w-fit flex items-center pr-2">
                <div className="h-8 w-8 sm:grid hidden rounded-[50%] place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="h-4.5 w-4.5"
                  >
                    <g>
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                    </g>
                  </svg>
                </div>
                <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="h-4.5 w-4.5"
                  >
                    <g>
                      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* reply box */}
          <div className="flex my-2">
            <div className="h-[8vh] w-[10%] flex items-center justify-center">
              <div className="h-6 w-6 lg:h-9 lg:w-9 border rounded-[50%] grid place-content-center lg:text-xl bg-[#84c346] text-white cursor-pointer">
                <span>{initial}</span>
              </div>
            </div>
            <div className="h-fit w-[90%] flex">
              <div className="h-fit w-full flex flex-col">
                <div
                  onClick={() => setReply(true)}
                  className="h-fit w-full flex items-center justify-start"
                >
                  <div className="h-fit w-full p-2 bg-black overflow-hidden">
                    <textarea
                      ref={textareaRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Post your reply"
                      className="h-fit w-full border-none resize-none outline-none text-lg sm:text-xl text-(--current-color) placeholder-neutral-500 overflow-hidden"
                      rows={1}
                    />
                  </div>
                </div>

                {/*  */}

                {/*  */}

                {reply && (
                  <div className="h-[7vh] w-full flex">
                    <div className="h-full w-full flex items-center justify-start">
                      <div
                        onClick={handleIconClick}
                        className="h-7 w-7 p-1 border-0 rounded-[50%] fill-(--fill-blue-color) hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-pointer"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          // onChange={handleFileChange}
                          className="hidden"
                        />
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 33 32" aria-hidden="true" class="">
                          <g>
                            <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-7 w-7 p-1 border-0 rounded-[50%] fill-[#205c85] hover:bg-(--bg-dark-blue-color) active:bg-(--bg-dark-blue-color) cursor-not-allowed">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="">
                          <g>
                            <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-full sm:[25%] md:w-[20%] w-[30%] flex justify-center items-center p-2">
                <div className="h-8 md:h-9 w-full text-sm sm:text-[1rem] bg-neutral-300 hover:bg-[#bdbdbd] border rounded-3xl text-black font-semibold cursor-pointer">
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="h-full w-full grid place-content-center"
                  >
                    {loading ? (
                      <div className="h-7 flex justify-center items-end animate-[bounce_0.5s_infinite]">
                        <div className="animate-[bounce_0.5s_infinite] [animation-delay:-0.3s]">
                          <GoDotFill />
                        </div>
                        <div className="animate-[bounce_0.5s_infinite] [animation-delay:-0.15s]">
                          <GoDot />
                        </div>
                        <div className="animate-[bounce_0.5s_infinite]">
                          <GoDotFill />
                        </div>
                      </div>
                    ) : (
                      "Reply"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          {/*  */}

          {/* comment section */}

          {/*  */}

          {/*  */}

          {comments.map((c) => {
            return (
              <div
                key={c.$id}
                className="h-fit w-full border-y border-y-(--border-color)"
              >
                {/* comment box of each comment */}
                <div className="h-fit w-full flex">
                  <div className="sm:h-full h-[75%] min-w-[10%] flex justify-center items-start">
                    <div className="min-w-10 sm:pt-2 pt-0 rounded-[50%] aspect-square bg-center flex justify-center items-center shrink">
                      {c.profile ? (
                        <img src={c?.profile} alt="" />
                      ) : (
                        <div className="h-6 w-6 lg:h-9 lg:w-9 border rounded-[50%] grid place-content-center lg:text-xl bg-[#84c346] text-white">
                          <span>{c.username[0].toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-fit w-full flex flex-col relative mr-2 ml-1 sm:m-2 sm:mb-0 sm:ml-0">
                    <div className="h-fit w-full flex">
                      <div className="h-fit">
                        <span className="text-(--current-color) text-sm sm:text-[1rem] font-semibold pr-2 hover:underline active:underline">
                          {c.username}
                        </span>
                      </div>
                      <div className="h-fit">
                        <span className="text-neutral-500 pl-1 pr-1">•</span>
                        <span className="text-neutral-500 text-smhover:underline text-sm active:underline">
                          {formatPostTime(c.createdAt)}
                        </span>
                      </div>
                    </div>
                    {/* content */}
                    <div className="h-fit w-full text-(--current-color) text-[1rem] sm:text-[1.1rem] font-sans">
                      <span>{c.content}</span>
                    </div>
                    <div className="h-fit w-15% flex absolute right-0 top-0">
                      <div className="h-8 w-8 sm:grid hidden rounded-[50%] place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                        <svg
                          viewBox="0 0 33 32"
                          aria-hidden="true"
                          class="h-5 w-5"
                        >
                          <g>
                            <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                          </g>
                        </svg>
                      </div>
                      <div
                        tabIndex={0}
                        className="h-8 w-8 group rounded-[50%] grid place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-5 w-5"
                        >
                          <g>
                            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                          </g>
                        </svg>
                        <div className="h-fit w-50 scale-75 sm:scale-100 invisible group-focus-within:visible fixed z-3 top-15 lg:top-25 right-0 lg:right-130 flex flex-col justify-center rounded-2xl shadow-white shadow-[0_0_7px_rgba(0,0,0,0.05)] text-white text-sm font-bold bg-black animate-pulse cursor-pointer">
                          <div
                            onClick={() => handleDelete(c)}
                            className="h-7 my-3 w-full flex justify-center items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color) rounded-lg"
                          >
                            <span>Delete comment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* media container of each comment */}
                <div className="h-fit w-full flex flex-col justify-center items-start pl-[5%] gap-2">
                  {/* media */}
                  {
                    // c.imageId && (
                    //   <div className="h-fit w-[75%] flex items-center border border-(--border-color) rounded-xl">
                    //     <div className="w-full aspect-auto overflow-hidden">
                    //       <a
                    //         href={getFileUrl(c.imageId)}
                    //         target="_blank"
                    //         rel="noopener noreferrer"
                    //       >
                    //         {c.mediaType === "image" && (
                    //           <img
                    //             className="h-full w-full object-cover object-center rounded-xl"
                    //             src={getFileUrl(c.imageId)}
                    //             alt="post"
                    //           />
                    //         )}
                    //         {c.mediaType === "video" && (
                    //           <video
                    //             className="h-full w-full object-cover object-center rounded-xl"
                    //             controls
                    //             src={getFileUrl(c.imageId)}
                    //           ></video>
                    //         )}
                    //         {/*url = [ENDPOINT]/storage/buckets/[BUCKET_ID]/files/[imageId]/preview?project=[PROJECT_ID] */}
                    //       </a>
                    //     </div>
                    //   </div>
                    // )
                  }
                  <div className="h-[6vh] w-full flex justify-between items-center">
                    {/* comments */}

                    <div className="h-fit w-fit flex items-center group">
                      <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--bg-dark-blue-color) group-hover:fill-(--fill-blue-color) group-active:bg-(--bg-dark-blue-color) group-active:fill-(--fill-blue-color)">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-4.5 w-4.5"
                        >
                          <g>
                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                          </g>
                        </svg>
                      </div>
                      <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--fill-blue-color) group-active:text-(--fill-blue-color) relative right-1">
                        0
                      </span>
                    </div>

                    <div className="h-fit w-fit flex items-center group">
                      <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--repost-bg-color) group-hover:fill-(--repost-fill-color) group-active:bg-(--repost-bg-color) group-active:fill-(--repost-fill-color)">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-4.5 w-4.5"
                        >
                          <g>
                            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                          </g>
                        </svg>
                      </div>
                      <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--repost-fill-color) relative right-1">
                        0
                      </span>
                    </div>

                    {/* likes */}

                    <div
                      // onClick={() => {
                      //   dispatch(
                      //     toggleLike({
                      //       postId: post.$id,
                      //       likesCount: post.likesCount,
                      //     }),
                      //   )
                      // }}
                      className="h-fit w-fit flex items-center group"
                    >
                      <div
                        className={`h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--like-bg-color) group-hover:fill-(--like-fill-color) group-active:bg-(--like-bg-color) group-active:fill-(--like-fill-color)`}
                      >
                        {
                          // isLiked ? (
                          //   <svg
                          //     viewBox="0 0 24 24"
                          //     aria-hidden="true"
                          //     class="h-4.5 w-4.5 fill-(--like-fill-color) transition-all duration-300 scale-125 animate-[pulse_0.5s_ease-out]"
                          //   >
                          //     <g>
                          //       <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                          //     </g>
                          //   </svg>
                          // ) : (
                          //   <svg
                          //     viewBox="0 0 24 24"
                          //     aria-hidden="true"
                          //     className="h-4.5 w-4.5 transition-all duration-300 ease-in"
                          //   >
                          //     <g>
                          //       <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                          //     </g>
                          //   </svg>
                          // )
                        }
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-4.5 w-4.5 transition-all duration-300 ease-in"
                        >
                          <g>
                            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                          </g>
                        </svg>
                      </div>
                      <span
                        className={`text-neutral-500 text-[0.8rem] group-hover:text-(--like-fill-color) relative right-1`}
                      >
                        {/* {c.likesCount ?? 0} */} 0
                      </span>
                    </div>

                    <div className="h-fit w-fit flex items-center group">
                      <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 group-hover:bg-(--bg-dark-blue-color) group-hover:fill-(--fill-blue-color) group-active:bg-(--bg-dark-blue-color) group-active:fill-(--fill-blue-color)">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-4.5 w-4.5"
                        >
                          <g>
                            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                          </g>
                        </svg>
                      </div>
                      <span className="text-neutral-500 text-[0.8rem] group-hover:text-(--fill-blue-color) relative right-1">
                        0
                      </span>
                    </div>
                    <div className="h-fit w-fit flex items-center pr-2">
                      <div className="h-8 w-8 sm:grid hidden rounded-[50%] place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-4.5 w-4.5"
                        >
                          <g>
                            <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          class="h-4.5 w-4.5"
                        >
                          <g>
                            <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default Comment;
