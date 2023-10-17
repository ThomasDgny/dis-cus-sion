import { Topics, User } from "@/types/Types";
import React from "react";
import { TopicCard } from "../card/blog-card/TopicCard";

type CommonTopics = Topics & { users: User };
interface RenderTopicsProps {
  array: CommonTopics[] | null;
}

export default function RenderTopics({ array }: RenderTopicsProps) {
  return (
    <>
      {array?.map((item) => (
        <div key={item.id} className="py-2">
          <TopicCard key={item.id} topicData={item} authorData={item.users} />
        </div>
      ))}
    </>
  );
}
