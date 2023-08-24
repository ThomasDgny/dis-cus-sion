"use client";
import React from "react";
import { EditProfile } from "../../dialog/EditProfile";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";

export default function ProfileHeaderActiveUserActions() {
  const { handleSignOut } = useAuth();

  return (
    <div className="mt-4 space-x-3">
      <EditProfile />
      <Button variant={"destructive"} onClick={handleSignOut}>
        Log out
      </Button>
    </div>
  );
}
