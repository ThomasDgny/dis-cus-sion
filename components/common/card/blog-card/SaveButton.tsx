"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";

function SaveButton({ cardID }: { cardID: string }) {
  const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(cardID);
  };

  return (
    <Button variant="outline" onClick={handleBookmarkClick}>
      <BookmarkIcon className="h-5 w-5" />
    </Button>
  );
}

export default SaveButton;
