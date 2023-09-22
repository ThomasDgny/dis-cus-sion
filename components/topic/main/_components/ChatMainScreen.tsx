import { Database } from "@/lib/database.type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

interface SendMessageProps {
  topicID: string;
}

export default async function ChatMainScreen({ topicID }: SendMessageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("topic_id", topicID);

  return (
    <div className="h-full bg-red-500">
      {messages?.map((item) => <p key={item.id}>{item.message}</p>)}
    </div>
  );
}
