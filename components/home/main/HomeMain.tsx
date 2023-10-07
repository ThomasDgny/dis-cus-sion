import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";
import HomePageLoading from "@/components/common/loading/HomePageLoading";
import { LoadMore } from "../actions/LoadMore";

export default async function HomeMain() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const range: number = 9;

  const { data, count, error } = await supabase
    .from("topics")
    .select("*, users(*)", { count: "exact" })
    .range(0, range)
    .order("timestamp", { ascending: false });

  if (error) console.log(error);

  const topics = data ?? [];
  const totalTopics: number | null = count;
  if (!topics || error) return <HomePageLoading />;

  return (
    <div>
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        {topics.map((item) => (
          <div key={item.id} className="py-2">
            <BlogCard key={item.id} topicData={item} authorData={item.users} />
          </div>
        ))}
      </div>
      <LoadMore range={range} totalTopics={totalTopics} />
    </div>
  );
}
