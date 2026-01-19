import React from "react";
import { useEffect, useState, useCallback, } from "react";
import { formatPostTime } from "../utils/time";
import { RiErrorWarningFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { category as selectCategory } from "../features/ui/uiSlice";

export default function TodaysNews({ isReq }) {
  const [articles, setArticles] = useState([]);
  const [visible, setVisible] = useState(true);
  const [limit, setLimit] = useState(() => (!isReq ? 3 : 5));
  const [hidden, setHidden] = useState(false);

  const category = useSelector(selectCategory);

  const [loading, setLoading] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);

  const handleShowMore = () => {
    setLimit(5);
    setHidden(true);
  };

  // https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=${limit}&apikey=03873c3ec6579df98746bf9a5e81eb87
  const fetchNews = useCallback(async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=${limit}&apikey=03873c3ec6579df98746bf9a5e81eb87NOT`;

    try {
      setLoading(true);
      setErrorDisplay(false);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response not ok");

      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setVisible(false);
      setErrorDisplay(true);
    } finally {
      setLoading(false);
    }
  }, [limit, category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (errorDisplay)
    return (
      <div className={`h-fit w-fit flex items-center gap-2 p-2 text-(--current-color) border-(--border-color) rounded-2xl ${!isReq ? "border" : ""} rounded-tr-none relative cursor-pointer`}>
        <RiErrorWarningFill />
        <span className="text-sm md:text-[1rem] text-[#999] italic font-semibold">
          {`Fetch failed (Todays News) ${category} :/`}
        </span>
      </div>
    );

  if (loading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-7 w-7 border-4 rounded-[50%] border-blue-950 border-t-blue-400 animate-spin"></div>
      </div>
    );
  return (
    <>
      {visible && (
        <div
          className={`h-fit w-full border-(--border-color) ${
            !isReq ? "rounded-2xl border" : "border-t border-b"
          }`}
        >
          <div className="h-12 w-ful p-3 flex">
            <span className="h-full w-full text-(--current-color) text-xl font-bold flex justify-start items-center">
              Todays's News
            </span>
            {!isReq.value && (
              <div
                onClick={() => setVisible(false)}
                className="h-full flex justify-end items-center fill-(--current-color)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
                  <g>
                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                  </g>
                </svg>
              </div>
            )}
          </div>

          {articles.map((article, i) => (
            <div
              key={i}
              className="h-fit w-full p-3 hover:bg-neutral-950 cursor-pointer rounded-b-2xl"
            >
              <p className="h-[75%] w-full flex justify-start items-center text-wrap text-(--current-color) font-semibold">
                {article.title}
              </p>
              <p className="h-[25%] w-full flex justify-start items-center text-wrap text-neutral-500 text-[0.8rem]">
                {formatPostTime(article.publishedAt)}
              </p>
            </div>
          ))}
          {!isReq && (
            <div
              className={`h-12 w-full p-3 hover:bg-neutral-950 rounded-b-2xl flex justify-start items-center text-blue-400 text-[0.9rem] cursor-pointer ${
                hidden ? "hidden" : "block"
              }`}
            >
              <span onClick={handleShowMore}>Show more</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
