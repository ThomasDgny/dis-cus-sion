"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Topics } from "@/types/Types";

export default function EditDescription({ topicData }: { topicData: Topics }) {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | undefined>(
    topicData?.desc ?? "data not found",
  );

  async function handleUpdateDescription(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("topics")
      .update({
        desc: description,
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

    toast({
      description: "Your changes have been saved.",
    });
  }

  return (
    <div>
      <form className="grid grid-cols-5 gap-4" onSubmit={handleUpdateDescription}>
        <Label htmlFor="bio" className="text-right">
         Description
        </Label>
        <Textarea
          required
          id="bio"
          value={description}
          className="col-span-3"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
