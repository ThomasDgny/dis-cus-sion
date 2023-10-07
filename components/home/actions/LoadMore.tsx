"use client";

import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics } from "@/types/Types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LoadFetch } from "./LoadFetch";

interface LoadMoreProps {
  range: number;
  totalTopics: number | null;
}

export function LoadMore({ range, totalTopics }: LoadMoreProps) {
  const [topics, setTopics] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const totalDataInDataBase = totalTopics ?? 0;

  function getFromAndTo() {
    const itemPerPage = range;
    let from = page * itemPerPage;
    const to = from + itemPerPage;
    if (page > 0) from += 1;
    return { from, to };
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreTopics = async () => {
    await delay(1000);
    const { from, to } = getFromAndTo();
    const newTopics = (await LoadFetch(from, to)) ?? [];
    setPage((prev) => prev + 1);
    setTopics((prevTopics: Topics[]) => [...prevTopics, ...newTopics]);
  };

  useEffect(() => {
    if (inView) {
      loadMoreTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const dataLeftToFetch = totalDataInDataBase - range - 1;
  const isLoading = dataLeftToFetch - topics.length !== 0;

  return (
    <>
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        {topics.map((item) => (
          <div key={item.id} className="py-2">
            <BlogCard key={item.id} topicData={item} authorData={item.users} />
          </div>
        ))}
      </div>
      {isLoading ? (
        <div
          className="col-span-1 flex items-center justify-center p-4 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <span>LOADING...</span>
        </div>
      ) : (
        <div>
          <span className="col-span-1 my-5 flex items-center justify-center rounded-md bg-slate-100 p-7">
            You reach the bottom
          </span>
        </div>
      )}
    </>
  );
}
