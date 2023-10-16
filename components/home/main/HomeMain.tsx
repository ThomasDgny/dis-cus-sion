import React from "react";
import HomePageLoading from "@/components/common/loading/HomePageLoading";
import { HomeTopics } from "../_components/HomeTopics";
import { getTopics } from "../actions/getTopics";

export default async function HomeMain() {
  const range: number = 9;
  const topics = await getTopics(0, range);

  if (!topics?.totalTopics) return <HomePageLoading />;
  const initialTopics = topics?.topics ?? [];
  const totalTopics: number | null = topics.totalTopics;
  return (
    <HomeTopics
      range={range}
      totalTopics={totalTopics}
      prevTopics={initialTopics}
    />
  );
}
