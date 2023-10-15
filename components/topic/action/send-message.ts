"use server";
import { Database } from "@/lib/database.type";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function handleSendMessage(
  formData: FormData,
  sender_id: string,
  topic_id: string,
) {
  const supabase = createServerActionClient<Database>({ cookies });
  const message = formData.get("message") as string;
  if (message.trim().length === 0) return;

  const currentMessage = {
    message,
    sender_id: sender_id,
    topic_id: topic_id,
  };

  const { error } = await supabase.from("messages").insert(currentMessage);
  if (error) {
    return {
      error: "Something went wrong while sending your message please try again",
    };
  }
}
