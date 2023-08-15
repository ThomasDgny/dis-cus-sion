import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { BlogEntry, User } from "@/types/Types";
import { supabase } from "@/db/supabase";

import React from "react";

export default async function page({ params }: { params: { userID: string } }) {
  const sessionUserID = "51c427ab-6728-49e9-9e04-09d8182c20f1";
  const userParamID = params.userID;

  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", userParamID)
    .single();

  const { data : blogs } = await supabase
    .from("blogs")
    .select()
    .eq("author_id", userParamID);

  const user: User = data ?? [];
  const topicsByUser: BlogEntry[] = blogs ?? [];

  if (!user) return null;

  return (
    <div className="space-y-20">
      <ProfileHeader userData={user} sessionUserID={sessionUserID} />
      <ProfileMain blogsByUser={topicsByUser} savedBlogsByUser={[]} />
    </div>
  );
}
