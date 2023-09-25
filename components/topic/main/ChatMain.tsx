import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatMainScreen from "./_components/ChatMainScreen";
import SendMessage from "./_components/SendMessage";

export default async function ChatMain({
  topicID,
}: {
  topicID: string;
}) {
  return (
    <div className="h-screen w-full rounded-md border flex flex-col justify-between">
      {/* <ChatHeader /> */}
      <ChatMainScreen topicID={topicID}/>
      <SendMessage topicID={topicID} />
    </div>
  );
}