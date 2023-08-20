"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "@radix-ui/react-icons";

import { FormEvent, useState } from "react";
import { SelectCategory } from "./SelectCategory";
import { supabaseClient } from "@/db/supabaseClient";

export function NewTopicButton({ sessionUserID }: { sessionUserID: string }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  if (!sessionUserID) return null;

  const topicData = {
    title: title,
    desc: description,
    category: "Art",
    author_id: sessionUserID,
  };

  const handleCreateTopic = async (event: FormEvent) => {
    event.preventDefault();
    const { error } = await supabaseClient.from("topics").insert(topicData);
    console.log(error?.hint);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full border-2 border-dashed p-0"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <SelectCategory />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              className="col-span-3"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateTopic}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
