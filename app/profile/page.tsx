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
      "user_name, bio, avatar, banner, topics(*,users(*)), saved(topics(*,users(*)))",
    )
    .eq("id", sessionUserID)
    .single();

  if (!userData) return null;
  //TODO : fix the typescript error here
  const user = userData;
  const topicsByUser: any[] = user.topics;
  const savedTopicsData: any[] = user.saved.map((item) => item.topics);

  return (
    <div className="space-y-20">
      <ProfileHeader />
      <ProfileMain
        blogsByUser={topicsByUser}
        savedBlogsByUser={savedTopicsData}
      />
    </div>
  );
}
