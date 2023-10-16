import React from "react";
import TopicAuthor from "@/components/topic/header/TopicAuthor";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";
import { EditTopic } from "@/components/topic/dialog/EditTopic";
import ChatMain from "@/components/topic/main/ChatMain";
import { dateConverter } from "@/utils/dateConverter";

export default async function page({
  params,
}: {
  params: { topicID: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const currentUserID = (await supabase.auth.getUser()).data.user?.id;
  const topicID: string = params.topicID;

  const { data: topicData, error } = await supabase
    .from("topics")
    .select("*, author:users(*)")
    .eq("id", topicID)
    .single();

  if (error && !topicData) return <div>No blog data found</div>;

  const topic = topicData;
  const author = topic.author;

  if (!author) return <div>No author data found</div>;

  return (
    <div className="flex flex-col items-center justify-between gap-10 rounded-md md:px-16 md:pt-16">
      <div className="w-full max-w-3xl space-y-10">
        <div className="flex items-center justify-between">
          <TopicAuthor authorData={author} />
          {currentUserID === author!.id && <EditTopic topicData={topic} />}
        </div>

        <div>
        <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
          {dateConverter(topic.timestamp)}
         <div>&#x2022;</div> 
          <div className="flex items-center">{topic.category}</div>
        </div>
          <h1 className="break-all text-4xl font-bold leading-[120%]">
            {topic.title}
          </h1>
          <p className="mt-5 break-all text-xl text-muted-foreground">
            {topic.desc}
          </p>
        </div>
      </div>
      <ChatMain topicID={topicID} />
    </div>
  );
}
