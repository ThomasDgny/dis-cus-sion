import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { BlogEntry, User } from "@/types/Types";
import { supabaseClient } from "@/db/supabaseClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

import React from "react";
import { supabase } from "@/db/supabase";

export default async function page({ params }: { params: { userID: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUserID = session?.user.id ?? "";
  const userParamID = params.userID;

  const { data } = await supabaseClient
    .from("users")
    .select()
    .eq("id", userParamID)
    .single();

  const { data: blogs } = await supabaseClient
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
