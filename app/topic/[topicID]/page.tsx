import { blogs } from "@/mock/Blogs";
import { BlogEntry } from "@/types/Types";
import React from "react";

const FindCurrentBlog = (db: BlogEntry[], currentBlogID: string) => {
  return db.find((item) => item.uuid === currentBlogID);
};

export default function page({ params }: { params: { topicID: string } }) {
  const blogID = params.topicID;
  const blogData = FindCurrentBlog(blogs, blogID);

  return (
    <div className="flex flex-col items-center justify-between md:p-16">
      <div>
        <h1 className="text-4xl font-bold">{blogData?.title}</h1>
        <p className="mt-1 text-lg text-gray-600">{blogData?.desc}</p>
      </div>
    </div>
  );
}
