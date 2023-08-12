import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/BlogCard";
import { BlogEntry } from "@/types/Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function ProfileMain({
  blogsByUser,
  savedBlogsByUser,
}: {
  blogsByUser: BlogEntry[];
  savedBlogsByUser: BlogEntry[];
}) {
  return (
    <main>
      <Tabs defaultValue="myBlogs" className="w-full">
        <TabsList className="flex w-fit gap-4 bg-white">
          <TabsTrigger value="myBlogs">My Blogs</TabsTrigger>
          <TabsTrigger value="savedBlogs">Saved</TabsTrigger>
        </TabsList>
        <hr className="mt-5" />
        <TabsContent value="myBlogs">
          <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
            {blogsByUser.map((item) => (
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
        </TabsContent>
        <TabsContent value="savedBlogs">
          <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
            {savedBlogsByUser.map((item) => (
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
        </TabsContent>
      </Tabs>
    </main>
  );
}
