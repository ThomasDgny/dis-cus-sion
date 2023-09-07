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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { UserUpdate } from "@/types/Types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useEffect, useState } from "react";
import Avatar from "./avatar-upload/Avatar";

export function EditProfile() {
  const [userName, setUserName] = useState<string | undefined>();
  const [bio, setBio] = useState<string | undefined>();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const { toast } = useToast();
  const MAGIC_AVATAR_URL = `https://nbuiqkkhjnhefvqmnprr.supabase.co/storage/v1/object/public/avatars/`;
  const publicUrl = `${MAGIC_AVATAR_URL}${avatar_url}`;

  function userDataMount(data: any) {
    setUserName(data?.user_name ?? "no data found");
    setBio(data?.bio ?? "no data found");
    setAvatarUrl(data?.avatar ?? null)
  }


  useEffect(() => {
    console.log("loading...");
    userDataMount(user);
    console.log("done!");
  }, [user]);


  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const updates: UserUpdate = {
      user_name: userName,
      bio: bio,
      avatar: publicUrl ?? null,
    };

    const { error } = await supabase
      .from("users")
      .update(updates)
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
            <Label htmlFor="picture" className="text-right">
              Picture
            </Label>
            <Avatar
              uid={user!.id}
              url={avatar_url}
              size={100}
              onUpload={(url) => {
                setAvatarUrl(url);
              }}
            />
          </div>
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
          <Button onClick={handleUpdateProfile} disabled={loading}>
            {!loading ? "Save changes" : "Loading"}{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
