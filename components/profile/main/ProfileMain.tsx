import React from "react";
import { Topics, User } from "@/types/Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderTopics from "@/components/common/render-topics/RenderTopics";

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
            <RenderTopics array={blogsByUser} />
          </div>
        </TabsContent>

        <TabsContent value="savedBlogs">
          <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-2 xl:grid-cols-3">
            <RenderTopics array={savedBlogsByUser} isSaved={true}/>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
