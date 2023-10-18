"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

function SaveButton({ cardID, title }: { cardID: string; title: string | null }) {
  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBookmarkClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const { error } = await supabase
      .from("saved")
      .upsert([{ user_id: user!.id, topic_id: cardID }])
      .select();

    if (error) {
      toast({
        variant: "destructive",
        description: `something went wrong while saving "${title}".`,
      });
    } else {
      toast({ description: `"${title}" has been saved.` });
    }
  };

  return (
    <Button variant="outline" onClick={handleBookmarkClick}>
      <BookmarkIcon className="h-5 w-5" />
    </Button>
  );
}

export default SaveButton;
