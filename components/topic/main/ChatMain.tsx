import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatMainScreen from "./_components/ChatMainScreen";
import SendMessage from "./_components/SendMessage";

export default async function ChatMain({ topicID }: { topicID: string }) {
  return (
    <div className="flex h-screen w-full flex-col justify-between rounded-md border">
      <ChatHeader />
      <ChatMainScreen topicID={topicID} />
      <SendMessage topicID={topicID} />
    </div>
  );
}
