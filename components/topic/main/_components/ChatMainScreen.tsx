
import { Message } from "@/types/Types";
import React from "react";

interface MessagesProps {
  messages: Message[] | null
}

export default async function ChatMainScreen({ messages }: MessagesProps) {
messages
  return (
    <div className="h-full bg-red-500">
      {messages?.map((item) => <p key={item.id}>{item.message}</p>)}
    </div>
  );
}
