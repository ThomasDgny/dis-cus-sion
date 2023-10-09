"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeader from "@/components/search/header/SearchHeader";
import { filterEngine } from "@/components/search/actions/searchEngine";
import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics, User } from "@/types/Types";

type CommonTopics = Topics & { users: User };

interface FilterEngineProps {
  titleQuery: string | null;
  categoryQuery: string | null;
}

export default function Search() {
  const [topics, setTopics] = useState<CommonTopics[] | null>([]);
  const searchParams = useSearchParams();
  const selectQuery = searchParams.get("q");
  const selectCategory = searchParams.get("category");

  useEffect(() => {
    async function search() {
      if (selectQuery) {
        const filterParams: FilterEngineProps = {
          titleQuery: selectQuery,
          categoryQuery: selectCategory,
        };

        try {
          const result = await filterEngine(filterParams);
          if (result) {
            setTopics(result);
          }
        } catch (error) {
          console.error("Search error:", error);
        }
      }
    }

    search();
  }, [selectQuery, selectCategory]);

  return (
    <div>
      <SearchHeader category={selectCategory} query={selectQuery} />
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        {topics?.map((item) => (
          <div key={item.id} className="py-2">
            <BlogCard key={item.id} topicData={item} authorData={item.users} />
          </div>
        ))}
      </div>
    </div>
  );
}
