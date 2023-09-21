import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatMainScreen from "./_components/ChatMainScreen";
import SendMessage from "./_components/SendMessage";

export default function ChatMain({ topicID }: { topicID: string }) {
  return (
    <div className="h-screen w-full rounded-md bg-slate-600">
      <ChatHeader />
      <ChatMainScreen />
      <SendMessage />
    </div>
  );
}
