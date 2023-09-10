"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

function SaveButton({ cardID }: { cardID: string }) {
  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const toast = useToast();

  const handleBookmarkClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    console.log(cardID);

    const { data, error } = await supabase
      .from("saved")
      .insert([{ user_id: user!.id, topic_id: cardID }])
      .select();
    console.log(data);
    console.log(error);
  };

  return (
    <Button variant="outline" onClick={handleBookmarkClick}>
      <BookmarkIcon className="h-5 w-5" />
    </Button>
  );
}

export default SaveButton;
