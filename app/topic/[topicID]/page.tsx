import { supabaseClient } from "@/db/supabaseClient";
import React from "react";
import TopicAuthor from "@/components/topic/header/TopicAuthor";
import TopicHeader from "@/components/topic/header/TopicHeader";

export default async function page({
  params,
}: {
  params: { topicID: string };
}) {
  const blogID = params.topicID;
  const { data: blog } = await supabaseClient
    .from("topics")
    .select()
    .eq("id", blogID)
    .single();

  if (!blog) {
    return <div>No blog data found</div>;
  }

  const { data: author } = await supabaseClient
    .from("users")
    .select()
    .eq("id", blog.author_id)
    .single();

  if (!author) {
    // Handle the case where no author data is found
    return <div>No author data found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-between md:p-16 bg-slate-400">
      <div className="max-w-3xl space-y-10">
        <TopicAuthor authorData={author} />
        {/* <TopicHeader /> */}
        <div>
          <h1 className="text-4xl font-bold leading-[120%]">{blog.title}</h1>
          <p className="mt-5 text-xl text-muted-foreground">{blog.desc}</p>
        </div>

        {/* <div className="w-full border-y border-muted-foreground/30 py-2">
          TODO: THIS COMPONENT WILL HAVE ACTIONS SUCH AS SAVE AND EDIT
        </div> */}
      </div>
    </div>
  );
}
