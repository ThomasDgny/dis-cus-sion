import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatMainScreen from "./_components/ChatMainScreen";
import SendMessage from "./_components/SendMessage";
import { Database } from "@/lib/database.type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ChatMain({
  topicID,
}: {
  topicID: string;
}) {

  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("topic_id", topicID);

  return (
    <div className="h-screen w-full rounded-md bg-slate-600 flex flex-col justify-between">
      <ChatHeader />
      <ChatMainScreen messages={messages}/>
      <SendMessage topicID={topicID} />
    </div>
  );
}
