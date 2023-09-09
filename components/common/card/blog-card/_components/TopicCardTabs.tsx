import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Topics, User } from "@/types/Types";
import Link from "next/link";

export default function TopicCardTabs({
  authorData,
  topicsByUser,
}: {
  authorData: User;
  topicsByUser: Topics[];
}) {
  return (
    <Tabs defaultValue="profile" className="h-full w-full">
      <TabsList className="mb-5 grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="topics">Topics</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="h-[77%] w-full overflow-y-auto">
        <div className="h-full w-full space-y-5 ">
          <div>
            <Label>Name</Label>
            <DialogTitle>{authorData.user_name}</DialogTitle>
          </div>
          <div>
            <Label>About Me</Label>
            <DialogDescription>{authorData.bio}</DialogDescription>
          </div>
          <div>
            <Label>Member Since</Label>
            <DialogDescription>{authorData.timestamp}</DialogDescription>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="topics" className="h-[77%] w-full overflow-y-auto">
        {topicsByUser.map((item) => (
          <div key={item.id} className="py-3 hover:bg-slate-100 p-3 rounded-md">
            <Link href={`/topic/${item.id}`}>
              <h1 className="truncate text-sm font-semibold max-w-lg">{item.title}</h1>
              <p className="truncate w-fit text-sm max-w-lg">{item.desc}</p>
            </Link>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
