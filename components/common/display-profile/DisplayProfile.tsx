"use client";
import React, { useState } from "react";
import { Topics, User } from "@/types/Types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TopicCardTabs from "./_components/TopicCardTabs";
import { Button } from "@/components/ui/button";
import ProfileDialogHeader from "./_components/ProfileDialogHeader";

export default function DisplayProfile({
  authorData,
  triggerButtonContent,
}: {
  authorData: User;
  triggerButtonContent: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  if (!authorData || authorData.user_name === null) return null;
  const { user_name, avatar, banner } = authorData;

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
          {triggerButtonContent}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2xl"
        onClick={(event) => event.preventDefault()}
      >
        <ProfileDialogHeader avatar={avatar ?? ""} user_name={user_name} banner={banner ?? ""}/>
        <div className="mt-12 h-64">
          <TopicCardTabs authorData={authorData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
