import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/BlogCard";

import { BlogEntry } from "@/types/Types";
import { supabase } from "@/db/supabaseServer";

export default async function HomeMain() {
  const { data, error } = await supabase.from("blogs").select();

  console.log(error?.message);
  const blogs: BlogEntry[] = data ?? [];
  
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
