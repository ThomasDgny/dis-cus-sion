"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useState } from "react";
import { Topics } from "@/types/Types";
import refresh from "../../actions/Refresh";

export default function EditTopicTitle({ topicData }: { topicData: Topics }) {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(
    topicData.title ?? "data not found",
  );

  async function handleUpdateTitle(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("topics")
      .update({
        title: title,
      })
      .eq("id", topicData.id);

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      return null;
    }
    // await refresh(topicData.id, setTitle);
    toast({
      description: "Your changes have been saved.",
    });
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 items-center gap-4"
        onSubmit={handleUpdateTitle}
      >
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          className="col-span-3"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
