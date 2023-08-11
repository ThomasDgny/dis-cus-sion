import { blogs } from "@/mock/Blogs";
import { BlogEntry } from "@/types/Types";
import React from "react";

const FindCurrentBlog = (db: BlogEntry[], currentBlogID: string) => {
  return db.find((item) => item.uuid === currentBlogID);
};

export default function page({ params }: { params: { blogID: string } }) {
  const blog_ID = params.blogID;
  const blogData = FindCurrentBlog(blogs, blog_ID);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between md:p-16">
      <div>
        <h1>{blogData?.title}</h1>
        <p>{blogData?.desc}</p>
      </div>
    </div>
  );
}
