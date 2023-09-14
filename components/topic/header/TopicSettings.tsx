import React from "react";
import { EditTopic } from "../dialog/EditTopic";
import { Topics } from "@/types/Types";

export default function TopicSettings({ topicData }: { topicData: Topics }) {
  return <div><EditTopic topicData={topicData}/></div>;
}
