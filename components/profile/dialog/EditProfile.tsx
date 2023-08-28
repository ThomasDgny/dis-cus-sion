"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";

export function EditProfile() {
  const client = createClientComponentClient<Database>();
  const { user } = useAuth();
  const [userName, setUserName] = useState<string | undefined>(user?.user_name ?? "");
  const [bio, setBio] = useState<string | undefined>(user?.bio ?? "");

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();

    const updates: Database["public"]["Tables"]["users"]["Update"] = {
      user_name: userName,
      bio: bio,
      avatar: "",
    };

    const { error } = await client
      .from("users")
      .update(updates)
      .eq("id", user?.id);

    if (error) {
      alert(error.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="name"
              value={userName}
              className="col-span-3"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Picture
            </Label>
            <Input id="picture" type="file" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              className="col-span-3"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateProfile}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
