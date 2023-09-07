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

  const { data: blogs } = await supabase
    .from("topics")
    .select()
    .eq("author_id", sessionUserID);

  const topicsByUser: Topics[] = blogs ?? [];
  if (!user) return null;

  return (
    <div className="space-y-20">
      <ProfileHeader/>
      <ProfileMain blogsByUser={topicsByUser} />
    </div>
  );
}
