"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

export async function LoadFetch(from: number, to: number) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: newTopics, error } = await supabase
    .from("topics")
    .select("*, users(*)")
    .range(from, to)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  console.log(newTopics);
  return newTopics;
}
