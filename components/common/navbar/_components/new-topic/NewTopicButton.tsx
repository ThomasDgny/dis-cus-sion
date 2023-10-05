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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

export function NewTopicButton({ sessionUserID }: { sessionUserID: string }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const titleSchema = z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long (maximum 100 characters)");
  const descriptionSchema = z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long (maximum 500 characters)");
  const selectedCategorySchema = z.string().min(1, "Category is required");

  const { toast } = useToast();

  const supabase = createClientComponentClient<Database>();
  if (!sessionUserID) return null;

  function clearInput() {
    setTitle("");
    setDescription("");
  }

  const handleCreateTopic = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const validatedTitle = titleSchema.parse(title);
      const validatedDescription = descriptionSchema.parse(description);
      const validatedSelectedCategory =
        selectedCategorySchema.parse(selectedCategory);

      const topicData = {
        title: validatedTitle,
        desc: validatedDescription,
        category: validatedSelectedCategory,
        author_id: sessionUserID,
      };

      const { error } = await supabase.from("topics").insert(topicData);
      console.log(error);
      toast({
        description: `Topic "${validatedTitle}" created.`,
        title: `Successful`,
      });
      clearInput();
    } catch (error) {
      if (title.length > 100) {
        toast({
          variant: "destructive",
          description: "Title is too long (maximum 100 characters)",
        });
      }
      if (description.length > 500) {
        toast({
          variant: "destructive",
          description: "Description is too long (maximum 500 characters)",
        });
      }
    }
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
        <form onSubmit={handleCreateTopic}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3">
                <span className="float-right text-xs text-gray-400">
                  {title.length}/100
                </span>
                <Input
                  id="title"
                  value={title}
                  className="col-span-3"
                  placeholder="Title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <SelectCategory setCategory={setSelectedCategory} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <span className="float-right text-xs text-gray-400">
                  {description.length}/500
                </span>
                <Textarea
                  id="description"
                  value={description}
                  className="col-span-3"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
