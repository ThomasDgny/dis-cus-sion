"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeader from "@/components/search/header/SearchHeader";
import { filterEngine } from "@/components/search/actions/searchEngine";
import { Topics, User } from "@/types/Types";
import SearchResultNotFound from "@/components/search/_components/SearchResultNotFound";
import RenderTopics from "@/components/common/render-topics/RenderTopics";

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
      if (selectQuery || selectCategory) {
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

  function searchResultByFilter() {
    const topicSearchResult = <RenderTopics array={topics} />;
    const searchResultErrorMessage = <SearchResultNotFound />;
    const searchConditionLogic = topics && topics.length > 0;
    return searchConditionLogic ? topicSearchResult : searchResultErrorMessage;
  }

  return (
    <div>
      <SearchHeader category={selectCategory} query={selectQuery} />
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        {searchResultByFilter()}
      </div>
    </div>
  );
}
