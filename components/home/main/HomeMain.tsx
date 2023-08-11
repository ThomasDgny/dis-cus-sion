import React from 'react'
import { BlogCard } from "@/components/common/card/BlogCard";
import { blogs } from "@/mock/Blogs";

export default function HomeMain() {
  return (
    <div>
        {blogs.map((item) => (
          <div key={item.uuid} className="py-10">
            <BlogCard
              key={item.uuid}
              title={item.title}
              desc={item.desc}
              category={item.category}
              timestamp={item.timestamp}
              user_name={item.user_name}
              uuid={""}
              user_image={""}
            />
          </div>
        ))}
      </div>
  )
}
