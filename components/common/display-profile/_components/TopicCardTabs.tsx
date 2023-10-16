"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Topics, User } from "@/types/Types";
import Link from "next/link";
import { dateConverter } from "@/utils/dateConverter";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";

export default function TopicCardTabs({ authorData }: { authorData: User }) {
  const [topics, setTopics] = useState<Topics[] | null>();
  const supabase = createClientComponentClient<Database>();

  async function AuthorTopics() {
    const { data: topics } = await supabase
      .from("topics")
      .select()
      .eq("author_id", authorData.id);
    return setTopics(topics);
  }
  
  useEffect(() => {
    AuthorTopics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorData.id]);

  const topicsByAuthor: Topics[] = topics ?? [];

  return (
    <Tabs defaultValue="profile" className="h-full w-full">
      <TabsList className="mb-5 grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="topics">Topics</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="h-[77%] w-full overflow-y-auto">
        <div className="h-full w-full space-y-5 ">
          <div className="space-y-2">
            <DialogTitle>{authorData.user_name}</DialogTitle>
            <DialogDescription>{authorData.bio}</DialogDescription>
          </div>
          <div>
            <Label>Member Since</Label>
            <DialogDescription>
              {dateConverter(authorData.timestamp ?? "BC")}
            </DialogDescription>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="topics" className="h-[77%] w-full overflow-y-auto">
        {topicsByAuthor.map((item) => (
          <div key={item.id} className="rounded-md p-3 py-3 hover:bg-slate-100">
            <Link href={`/topic/${item.id}`}>
              <h1 className="max-w-lg truncate text-sm font-semibold">
                {item.title}
              </h1>
              <p className="w-fit max-w-lg truncate text-sm">{item.desc}</p>
            </Link>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
