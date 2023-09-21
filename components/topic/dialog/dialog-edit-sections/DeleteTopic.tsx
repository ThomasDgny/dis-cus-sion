"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DeleteTopic({ topicID }: { topicID: string }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleRemoveTopic() {
    setLoading(true);
    const { error } = await supabase.from("topics").delete().eq("id", topicID);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      return null;
    }
    setLoading(false);
    router.replace("/")
    toast({
      description: "Topic has been deleted",
    });
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <Label htmlFor="delete" className="text-right" />
      <Button
        onClick={handleRemoveTopic}
        disabled={loading}
        className="col-span-3"
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
}
