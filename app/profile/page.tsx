import React from "react";
import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUserID = session?.user.id ?? "";

  const { data: userData } = await supabase
    .from("users")
    .select(
      "user_name, bio, avatar, banner, topics(*,users(*)), saved(topic_id)",
    )
    .eq("id", sessionUserID)
    .single();

  if (!userData) return null;

  const user = userData;
  const topicsByUser = user.topics;
  const savedTopicsIDs = user.saved.map((item) => item.topic_id);

  const { data: savedTopicsData } = await supabase
    .from("topics")
    .select("*, users(*)")
    .in("id", savedTopicsIDs);

  console.log(savedTopicsData);

  const savedTopics = savedTopicsData || [];

  return (
    <div className="space-y-20">
      <ProfileHeader />
      <ProfileMain blogsByUser={topicsByUser} savedBlogsByUser={savedTopics} />
    </div>
  );
}
