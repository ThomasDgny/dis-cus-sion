"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export async function getTopics(from: number = 0, to: number) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: newTopics,
    count,
    error,
  } = await supabase
    .from("topics")
    .select("*, users(*)", { count: "exact" })
    .range(from, to)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return {
    topics: newTopics,
    totalTopics: count,
  };
}
