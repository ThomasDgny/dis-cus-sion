"use client";

import { TopicCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics } from "@/types/Types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getTopics } from "../actions/getTopics";
import { pagination } from "@/utils/pagination";
import { delay } from "@/utils/delay";
import RenderTopics from "@/components/common/render-topics/RenderTopics";

interface LoadMoreProps {
  range: number;
  totalTopics: number | null;
  prevTopics: any[];
}

export function HomeTopics({ range, totalTopics, prevTopics }: LoadMoreProps) {
  const [topics, setTopics] = useState<any[]>(prevTopics);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const totalDataInDataBase = totalTopics ?? 0;

  const loadMoreTopics = async () => {
    await delay(500);
    const { from, to } = pagination(range, page);
    const newTopics = await getTopics(from, to);
    setPage((prev) => prev + 1);

    if (newTopics?.topics) {
      setTopics((prevTopics: Topics[]) => [
        ...prevTopics,
        ...(newTopics.topics as Topics[]),
      ]);
    }
  };

  useEffect(() => {
    if (inView) loadMoreTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const isLoading = topics.length !== totalDataInDataBase;

  return (
    <>
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        <RenderTopics array={topics}/>
      </div>
      {isLoading ? (
        <div
          className="col-span-1 flex items-center justify-center p-4 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <span>LOADING...</span>
        </div>
      ) : (
          <span className="col-span-1 my-5 flex items-center justify-center rounded-md bg-slate-100 p-7">
            You reach the bottom
          </span>
      )}
    </>
  );
}
