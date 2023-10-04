import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";
import HomePageLoading from "@/components/common/loading/HomePageLoading";



export default async function HomeMain() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("topics")
    .select("*, users(*)")
    .range(0, 20)
    .order("timestamp", { ascending: false });

  console.log(error);
  const topics = data ?? [];
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
    </div>
  );
}
