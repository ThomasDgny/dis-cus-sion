import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatMainScreen from "./_components/ChatMainScreen";
import SendMessage from "./_components/SendMessage";
import { User } from "@/types/Types";

export default function ChatMain({
  topicID,
}: {
  topicID: string;
}) {
  return (
    <div className="h-screen w-full rounded-md bg-slate-600 flex flex-col justify-between">
      <ChatHeader />
      <ChatMainScreen topicID={topicID}/>
      <SendMessage topicID={topicID} />
    </div>
  );
}
