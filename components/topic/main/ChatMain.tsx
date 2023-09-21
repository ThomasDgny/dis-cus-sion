import React from "react";

export default function ChatMain({ topicID }: { topicID: string }) {
  return <div className="h-[800px] w-full rounded-md bg-slate-600">{topicID}</div>;
}
