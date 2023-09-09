"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Topics, User } from "@/types/Types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import TopicCardTabs from "./TopicCardTabs";

export default function DirectProfileButton({
  authorData,
  topicsByUser,
}: {
  authorData: User;
  topicsByUser: Topics[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  if (!authorData || authorData.user_name === null) return null;
  const { user_name, avatar, bio, timestamp } = authorData;

  const handleDirectProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          onClick={handleDirectProfile}
          className="flex items-center gap-2 p-0"
        >
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={avatar ?? ""}
              className="object-cover"
              alt={authorData.user_name}
            />
            <AvatarFallback>{user_name[0]}</AvatarFallback>
          </Avatar>
          <p className="font-medium hover:underline">{user_name}</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2xl"
        onClick={(event) => event.preventDefault()}
      >
        <DialogHeader className="relative h-56 rounded-md">
          <div className="absolute z-0 h-full w-full rounded-md bg-slate-300"></div>
          <div className="absolute -bottom-10 left-5 z-10 h-24 w-24 rounded-full border-[7px] border-white">
            <Avatar className="h-full w-full">
              <AvatarImage
                src={avatar ?? ""}
                className="object-cover"
                alt={authorData.user_name}
              />
              <AvatarFallback>{user_name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </DialogHeader>

        <div className="mt-12 h-64">
          <TopicCardTabs authorData={authorData} topicsByUser={topicsByUser} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
