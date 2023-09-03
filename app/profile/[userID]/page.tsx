import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProfileMain from "@/components/profile/main/ProfileMain";
import { Topics, User } from "@/types/Types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

import React from "react";

export default async function page({ params }: { params: { userID: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUserID = session?.user.id ?? "";
  const userParamID = params.userID;

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("id", userParamID)
    .single();

  const { data: blogs } = await supabase
    .from("topics")
    .select()
    .eq("author_id", userParamID);

  const topicsByUser: Topics[] = blogs ?? [];
  if (!user) return null;

  return (
    <div className="space-y-20">
      <ProfileHeader userData={user} sessionUserID={sessionUserID} />
      <ProfileMain blogsByUser={topicsByUser} />
    </div>
  );
}