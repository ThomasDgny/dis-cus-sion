import React from "react";
import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { Topics } from "@/types/Types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUserID = session?.user.id ?? "";

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("id", sessionUserID)
    .single();

  const { data: topicsCreatedByUser } = await supabase
    .from("topics")
    .select()
    .eq("author_id", sessionUserID);

  const { data: saved } = await supabase
    .from("saved")
    .select("topic_id")
    .eq("user_id", sessionUserID);

  const savedTopicsId: string[] =
    saved?.map((topic) => topic.topic_id ?? "") ?? [];

  const { data: savedTopics } = await supabase
    .from("topics")
    .select()
    .in("id", savedTopicsId);

  const topicsByUser: Topics[] = topicsCreatedByUser ?? [];
  const savedByUser: Topics[] = savedTopics ?? [];
  if (!user) return null;

  return (
    <div className="space-y-20">
      <ProfileHeader />
      <ProfileMain
        blogsByUser={topicsByUser}
        savedBlogsByUser={savedByUser}
      />
    </div>
  );
}
