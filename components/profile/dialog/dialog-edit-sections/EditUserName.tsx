"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useState } from "react";

export default function EditUserName() {
  const supabase = createClientComponentClient<Database>();
  const { user, getSessionUserData } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(
    user?.user_name ?? "data not found",
  );

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({
        user_name: userName,
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
    getSessionUserData(user!.id);
    toast({
      description: "Your changes have been saved.",
    });
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 items-center gap-4"
        onSubmit={handleUpdateProfile}
      >
        <Label htmlFor="name" className="text-right">
          Username
        </Label>
        <Input
          id="name"
          value={userName}
          className="col-span-3"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
