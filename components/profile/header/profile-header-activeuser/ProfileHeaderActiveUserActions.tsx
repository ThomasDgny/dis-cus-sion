import React from "react";
import { EditProfile } from "../../dialog/EditProfile";
import { Button } from "@/components/ui/button";

export default function ProfileHeaderActiveUserActions() {
  return (
    <div className="mt-4 space-x-3">
      <EditProfile />
      <Button variant={"destructive"}>Log out</Button>
    </div>
  );
}
