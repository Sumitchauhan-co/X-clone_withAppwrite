import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPostTime } from "../utils/time";
import { deletePost, fetchPosts } from "../features/posts/postThunk";
import { getFileUrl } from "../services/posts";
import {
  fetchUserLikes,
  toggleLike,
} from "../features/post_likes/PostLikesThunk";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.posts);

  // const {comments} = useSelector((s)=> s.comments)
  // const commentsCount = comments.length

  const inHomeIsActive = useSelector((state) => state.ui.inHomeIsActive);

  const {user} = useSelector((s) => s.auth);

  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  // const [deleteId, setDeleteId] = useState(null);

  // const handleDelete = (p) => {
  //     dispatch(deletePost(p.$id));
  //   setReload((prev) => !prev);
  // };

  const handleDelete = async (p) => {
    // console.log(p, user);
    if (p.userId === user.$id) {
      await dispatch(deletePost(p.$id));
    }
    setReload((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchPosts());

    if (user?.$id) {
      dispatch(fetchUserLikes());
    }
  }, [dispatch, user, reload]);

  // if (list.length > 0) {
  //   console.log("for you post : list ->", list);
  // }

  const likedPostIds = useSelector((s) => s.likes.likedPostIds);

  if (loading)
    return (
      inHomeIsActive === "for you" && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-7 w-7 border-4 rounded-[50%] border-blue-950 border-t-blue-400 animate-spin"></div>
        </div>
      )
    );

  return (
    <>
      {inHomeIsActive === "for you" &&
        list.map((p) => {
          const isLiked = Array.isArray(likedPostIds)
            ? likedPostIds.includes(p.$id)
            : false;
          return (
            <div
              onClick={() => navigate(`/home/comment/${p.$id}`)}
              key={p.$id}
              className="h-fit w-full border-(--border-color) border-t border-b flex flex-col cursor-pointer hover:bg-(--bg-primary-color)"
            >
              <div className="h-fit w-full flex mb-2">
                <div className="sm:h-full h-[75%] min-w-[10%] flex justify-center items-start">
                  <div className="min-w-10 sm:pt-2 pt-0  rounded-[50%] aspect-square bg-center flex justify-center items-center shrink">
                    {p.profile ? (
                      <img src={p.profile} alt="" />
                    ) : (
                      <div className="h-6 w-6 lg:h-9 lg:w-9 border rounded-[50%] grid place-content-center lg:text-xl bg-[#84c346] text-white">
                        <span>{p.username[0].toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-fit w-full flex flex-col relative gap-2 m-2">
                  <div className="h-fit w-full flex flex-row">
                    <div className="h-fit">
                      <span className="text-(--current-color) text-sm sm:text-lg font-semibold pr-2 hover:underline active:underline">
                        {p.username}
                      </span>
                    </div>
                    <div className="h-fit">
                      {/* <span className="text-neutral-500 text-[0.9rem]"></span> */}
                      <span className="text-neutral-500 text-[0.9rem] pl-1 pr-1">
                        •
                      </span>
                      <span className="text-neutral-500 text-[0.8rem] sm:text-[0.9rem] hover:underline active:underline">
                        {formatPostTime(p.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={0}
                    className="h-fit w-15% group flex absolute right-0 top-0"
                  >
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
                    <div className="h-8 w-8 rounded-[50%] grid place-content-center fill-neutral-500 hover:bg-(--bg-dark-blue-color) hover:fill-(--fill-blue-color) active:bg-(--bg-dark-blue-color) active:fill-(--fill-blue-color)">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="h-5 w-5"
                      >
                        <g>
                          <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="h-fit w-45 scale-90 sm:scale-100 invisible group-focus-within:visible fixed z-3 top-20 sm:top-50 right-5 lg:right-125 flex flex-col justify-center rounded-2xl shadow-white shadow-[0_0_7px_rgba(0,0,0,0.05)] text-white text-sm font-bold bg-black animate-pulse cursor-pointer">
                      <div
                        onClick={() => handleDelete(p)}
                        className="h-7 my-3 w-full flex justify-center items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color) rounded-lg"
                      >
                        <span>Delete post</span>
                      </div>
                    </div>
                    {/* <div className="h-fit w-45 scale-75 sm:scale-100 invisible group-focus-within:visible fixed z-3 top-20 sm:top-40 right-5 lg:right-150 flex flex-col justify-center rounded-2xl shadow-white shadow-[0_0_7px_rgba(0,0,0,0.05)] text-white text-sm font-bold bg-black animate-pulse cursor-pointer">
                      <div
                        onClick={() => setDeleteId(p.$id)}
                        className="h-7 my-3 w-full flex justify-center items-center hover:bg-(--bg-primary-color) active:bg-(--bg-primary-color) rounded-lg"
                      >
                        <span>Delete post</span>
                      </div>
                    </div> */}

                    {/* {deleteId && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="bg-white p-4 rounded">
                          <p>Are you sure you want to delete this post?</p>

                          <button onClick={() => setDeleteId(null)}>
                            Cancel
                          </button>

                          <button
                            onClick={() => {
                              dispatch(deletePostThunk(deleteId));
                              setDeleteId(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="h-fit w-full text-(--current-color) text-sm sm:text-lg font-sans">
                    <span>{p.content}</span>
                  </div>
                </div>
              </div>

              <div className="h-fit w-full flex flex-col justify-center items-start pl-[10%] gap-2">
                {p.imageId && (
                  <div className="h-fit w-[75%] flex items-center border border-(--border-color) rounded-xl">
                    <div className="w-full aspect-auto overflow-hidden">
                      <a
                        href={getFileUrl(p.imageId)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.mediaType === "image" && (
                          <img
                            className="h-full w-full object-cover object-center rounded-xl"
                            src={getFileUrl(p.imageId)}
                            alt="post"
                          />
                        )}

                        {p.mediaType === "video" && (
                          <video
                            className="h-full w-full object-cover object-center rounded-xl"
                            controls
                            src={getFileUrl(p.imageId)}
                          ></video>
                        )}

                        {/*url = [ENDPOINT]/storage/buckets/[BUCKET_ID]/files/[imageId]/preview?project=[PROJECT_ID] */}
                      </a>
                    </div>
                  </div>
                )}
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
                      {p.commentsCount ?? 0}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        toggleLike({ postId: p.$id, likesCount: p.likesCount }),
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
                      {p.likesCount ?? 0}
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
    </>
  );
};

export default Feed;
