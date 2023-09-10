import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics } from "@/types/Types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function HomeMain() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("topics")
    .select()
    .range(0,5)
    .order('timestamp', { ascending: false })

  console.log(error?.message);
  const blogs: Topics[] = data ?? [];

  return (
    <div>
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((item) => (
          <div key={item.id} className="py-5">
            <BlogCard
              key={item.id}
              title={item.title}
              desc={item.desc}
              category={item.category}
              timestamp={item.timestamp}
              id={item.id}
              author_id={item.author_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
