"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { experimental_useFormStatus } from "react-dom";
import { updateBio } from "../../action/profile-bio-update";

export default function EditBio() {
  const { user, getSessionUserData } = useAuth();
  const { pending } = experimental_useFormStatus();
  const { toast } = useToast();

  const [bio, setBio] = useState<string | undefined>(
    user?.bio ?? "data not found",
  );

  async function handleUpdateProfile(formData: FormData) {
    const result = await updateBio(user!.id, formData);

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      getSessionUserData(user!.id);
      toast({
        description: "Your changes have been saved.",
      });
    }
  }

  return (
    <div>
      <form className="grid grid-cols-5 gap-4" action={handleUpdateProfile}>
        <Label htmlFor="bio" className="text-right">
          Bio
        </Label>
        <Textarea
          required
          id="bio"
          name="bio"
          disabled={pending}
          value={bio}
          className="col-span-3"
          onChange={(e) => setBio(e.target.value)}
        />
        <Button type="submit" variant={"ghost"} disabled={pending}>
          {!pending ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
