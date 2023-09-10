import React from "react";
import TopicAuthor from "@/components/topic/header/TopicAuthor";
import TopicHeader from "@/components/topic/header/TopicHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function page({
  params,
}: {
  params: { topicID: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const topicID = params.topicID;
  const { data: topic } = await supabase
    .from("topics")
    .select()
    .eq("id", topicID)
    .single();

  const topicData = topic;

  if (!topic) {
    return <div>No blog data found</div>;
  }

  const { data: author } = await supabase
    .from("users")
    .select()
    .eq("id", topicData!.author_id)
    .single();

  const userProfileData = author;

  if (!userProfileData) {
    return <div>No author data found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-between bg-slate-400 md:p-16">
      <div className="max-w-3xl space-y-10">
        <TopicAuthor authorData={userProfileData} />
        {/* <TopicHeader /> */}
        <div>
          <h1 className="text-4xl font-bold leading-[120%]">{topic.title}</h1>
          <p className="mt-5 text-xl text-muted-foreground">{topic.desc}</p>
        </div>

        {/* <div className="w-full border-y border-muted-foreground/30 py-2">
          TODO: THIS COMPONENT WILL HAVE ACTIONS SUCH AS SAVE AND EDIT
        </div> */}
      </div>
    </div>
  );
}
