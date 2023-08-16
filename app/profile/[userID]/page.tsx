import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { BlogEntry, User } from "@/types/Types";
import { supabase } from "@/db/supabase";

import React from "react";

export default async function page({ params }: { params: { userID: string } }) {
  const sessionUserID = "9ebc2c79-0249-4a9e-929b-317b66e44369";
  const userParamID = params.userID;

  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", userParamID)
    .single();

  const { data : blogs } = await supabase
    .from("topics")
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
