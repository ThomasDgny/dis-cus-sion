"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BookmarkMinus } from "lucide-react";
import { useState } from "react";

interface RemoveButtonProps {
  topicID: string;
  title: string | null;
}

export function RemoveButton({ topicID, title }: RemoveButtonProps) {
  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRemoveTopic = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("user_id", user!.id)
      .eq("topic_id", topicID);

    if (error) {
      toast({
        variant: "destructive",
        description: `something went wrong while removing "${title}".`,
      });
    } else {
      toast({ description: `"${title}" has been removed.` });
    }
  };

  return (
    <Button
      onClick={handleRemoveTopic}
      variant={"default"}
      className="bg-red-500"
    >
      <BookmarkMinus className="h-5 w-5 text-white" />
    </Button>
  );
}
