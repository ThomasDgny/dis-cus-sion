"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useState } from "react";
import Avatar from "../avatar-upload/Avatar";

export default function EditAvatar() {
  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatarUrl] = useState<string | null>(
    user?.avatar ?? null,
  );

  const MAGIC_AVATAR_URL = `https://nbuiqkkhjnhefvqmnprr.supabase.co/storage/v1/object/public/avatars/`;
  const publicUrl = `${MAGIC_AVATAR_URL}${avatar}`;

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({
        avatar: publicUrl,
      })
      .eq("id", user?.id);

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
      <form
        className="grid grid-cols-5 gap-4 items-baseline"
        onSubmit={handleUpdateProfile}
      >
        <Label htmlFor="picture" className="text-right">
          Picture
        </Label>
        <Avatar
          uid={user!.id}
          url={avatar ?? null}
          size={80}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
        />
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
