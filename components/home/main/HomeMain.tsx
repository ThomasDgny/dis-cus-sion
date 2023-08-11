import React from "react";
import { BlogCard } from "@/components/common/card/BlogCard";
import { blogs } from "@/mock/Blogs";

export default function HomeMain() {
  return (
    <div>
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg p-8 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((item) => (
          <div key={item.uuid} className="py-5">
            <BlogCard
              key={item.uuid}
              title={item.title}
              desc={item.desc}
              category={item.category}
              timestamp={item.timestamp}
              uuid={item.uuid}
              author_id={item.author_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
