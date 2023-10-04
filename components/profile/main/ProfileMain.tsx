import React from "react";
import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics, User } from "@/types/Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type CommonTopics = Topics & { users: User };

export default function ProfileMain({
  blogsByUser,
  savedBlogsByUser,
}: {
  blogsByUser: CommonTopics[];
  savedBlogsByUser: CommonTopics[];
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
              <div key={item.id} className="py-2">
                <BlogCard
                  key={item.id}
                  topicData={item}
                  authorData={item.users}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="savedBlogs">
          <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
            {savedBlogsByUser?.map((item) => (
              <div key={item.id} className="py-2">
                <BlogCard
                  key={item.id}
                  topicData={item}
                  authorData={item.users}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
