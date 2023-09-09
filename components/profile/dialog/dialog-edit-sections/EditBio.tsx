"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function EditBio() {
  const supabase = createClientComponentClient<Database>();
  const { user, getSessionUserData } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState<string | undefined>(
    user?.bio ?? "data not found",
  );

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({
        bio: bio,
      })
      .eq("id", user!.id);

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      return null;
    }
    getSessionUserData(user!.id);
    toast({
      description: "Your changes have been saved.",
    });
  }

  return (
    <div>
      <form className="grid grid-cols-5 gap-4" onSubmit={handleUpdateProfile}>
        <Label htmlFor="bio" className="text-right">
          Bio
        </Label>
        <Textarea
          required
          id="bio"
          value={bio}
          className="col-span-3"
          onChange={(e) => setBio(e.target.value)}
        />
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
