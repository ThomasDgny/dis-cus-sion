"use server";
import { Database } from "@/lib/database.type";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getMessages = async (topicID: string | null) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*, user: users(*)")
    .eq("topic_id", topicID)
    .range(0, 30)
    .order("created_at");

  if (messages) {
    const newProfiles = Object.fromEntries(
      messages
        .map((message) => message.user)
        .filter(Boolean)
        .map((user) => [user!.id, user!]),
    );
    return {
      newProfiles: newProfiles,
      messages: messages,
    };
  } else {
    return {
      error: "something went wrong while loading messages please try again.",
    };
  }
};
