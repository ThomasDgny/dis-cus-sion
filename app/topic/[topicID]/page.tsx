import { BlogEntry } from "@/types/Types";
import { supabaseClient } from "@/db/supabaseClient";
import React from "react";

export default async function page({ params }: { params: { topicID: string } }) {
  const blogID = params.topicID;

  const { data } = await supabaseClient
  .from("topics")
  .select()
  .eq("id", blogID)
  .single()

  const blogData : BlogEntry = data ?? []

  return (
    <div className="flex flex-col items-center justify-between md:p-16">
      <div>
        <h1 className="text-4xl font-bold">{blogData.title}</h1>
        <p className="mt-1 text-lg text-gray-600">{blogData.desc}</p>
      </div>
    </div>
  );
}
