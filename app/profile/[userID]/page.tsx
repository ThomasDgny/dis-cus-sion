import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { blogs } from "@/mock/Blogs";
import { savedBlogs } from "@/mock/UserSavedBlogs";
import { User } from "@/types/Types";
import { supabase } from "@/db/supabaseServer";

import React from "react";

export default async function page({ params }: { params: { userID: string } }) {
  const sessionUserID = "u6i7d8";
  const userParamID = params.userID;

  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", userParamID)
    .single();

  const user: User = data ?? [];

  if (!user) return null;

  return (
    <div className="space-y-20">
      <ProfileHeader userData={user} sessionUserID={sessionUserID} />
      <ProfileMain blogsByUser={[]} savedBlogsByUser={[]} />
    </div>
  );
}
