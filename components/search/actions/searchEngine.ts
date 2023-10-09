"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Topics, User } from "@/types/Types";

interface FilterEngineProps {
  titleQuery: string | null;
  categoryQuery: string | null;
}

type CommonTopics = Topics & { users: User };

export async function filterEngine(selectQuery: FilterEngineProps) {
  const supabase = createServerComponentClient({ cookies });

  // Prepare queries for title and category
  const titleQuery = selectQuery.titleQuery?.trim() ?? "";
  const categoryQuery = selectQuery.categoryQuery?.trim() ?? "";
  console.log("categoryQuery", categoryQuery)

  // Define functions for querying the database
  const performQuery = async (field: string, query: string | null) => {
    if (!query) {
      return [];
    }

    const { data, error } = await supabase
      .from("topics")
      .select("*, users(*)")
      .textSearch(field, query, {
        type: "websearch",
      });
    console.log(data as CommonTopics[]);
    return data as CommonTopics[];
  };

  // Perform queries for title and category in parallel
  const [titleResults, categoryResults] = await Promise.all([
    performQuery("title", titleQuery),
    performQuery("category", categoryQuery),
  ]);

  // Merge and deduplicate the results
  const filterResult = [...titleResults, ...categoryResults];
  const uniqueResults = [...new Set(filterResult)];

  return uniqueResults;
}
