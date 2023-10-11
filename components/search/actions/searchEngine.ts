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

  const titleQuery = selectQuery.titleQuery?.trim() ?? "";
  const categoryQuery = selectQuery.categoryQuery?.trim() ?? "All";

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

    return data as CommonTopics[];
  };

  let categoryResults: CommonTopics[] = [];
  let titleResults: CommonTopics[] = [];

  if (categoryQuery === "All") {
    titleResults = await performQuery("title", titleQuery); 
  } else {
    categoryResults = await performQuery("category", categoryQuery); 
  }

  const filterCategoryResults = categoryResults.filter((topic) => {
    const query = titleQuery.toLowerCase();
    const title = topic.title?.toLowerCase() || "";
    const category = topic.category?.toLowerCase() || "";
    const desc = topic.desc?.toLowerCase() || "";

    return (
      title.includes(query) || category.includes(query) || desc.includes(query)
    );
  });


  const filterResult = [...titleResults, ...filterCategoryResults];
  const uniqueResults = [...new Set(filterResult)];

  return uniqueResults;
}
