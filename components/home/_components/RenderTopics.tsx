import { BlogCard } from "@/components/common/card/blog-card/TopicCard";
import { Topics, User } from "@/types/Types";
import React from "react";

type CommonTopics = Topics & { users: User };

interface RenderTopicsProps {
  topics: CommonTopics[];
}

export default function RenderTopics({ topics }: RenderTopicsProps) {
  return (
    <>
      {topics.map((item) => (
        <div key={item.id} className="py-2">
          <BlogCard key={item.id} topicData={item} authorData={item.users} />
        </div>
      ))}
    </>
  );
}
