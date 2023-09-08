"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useEffect, useState } from "react";
import Avatar from "../avatar-upload/Avatar";
import Image from "next/image";

export default function EditAvatar() {
  const supabase = createClientComponentClient<Database>();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.avatar ?? null,
  );

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setAvatarUrl(fileReader.result as string);
    };
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    } else {
      setAvatarUrl(null);
    }
  }, [selectedFile]);

  const getDownloadUrl = async (
    userId: string,
    imageSection: "profile" | "banner",
  ) => {
    const imagePath = `${userId}/${imageSection}/user`;
    const { data } = supabase.storage.from("avatars").getPublicUrl(imagePath);
    console.log("getDownloadUrl", data.publicUrl);
    return setAvatarUrl(data.publicUrl);
  };

  const deleteImage = async (
    userId: string,
    imageSection: "profile" | "banner",
  ) => {
    const previousImagePath = `${userId}/${imageSection}/user`;
    const { error } = await supabase.storage
      .from("avatars")
      .remove([previousImagePath]);
    setAvatarUrl(null);
    console.log(error, `deleteImage ERROR`);
  };

  const uploadImage = async (
    image: File,
    imageSection: "profile" | "banner",
  ) => {
    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${user?.id}/${imageSection}/user`, image);

    if (error) {
      console.log(error);
      return;
    }
  };

  const updateUserImgUrl = async (publicUrl: string | null) => {
    const { error } = await supabase
      .from("users")
      .update({
        avatar: publicUrl,
      })
      .eq("id", user?.id);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again.",
      });
      return;
    } else {
      setLoading(false);
      toast({
        description: "Your changes have been saved.",
      });
    }
  };

  async function handleUpdateProfile(event: FormEvent) {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        variant: "destructive",
        description: `Please select an image`,
      });
      return;
    }
    setLoading(true);
    if (user!.avatar) await deleteImage(user!.id, "profile");
    await uploadImage(selectedFile, "profile");
    await getDownloadUrl(user!.id, "profile");
    await updateUserImgUrl(avatarUrl);
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 items-baseline gap-4"
        onSubmit={handleUpdateProfile}
      >
        <Label htmlFor="picture" className="text-right">
          Profile Image
        </Label>
        <div className="col-span-3 items-baseline gap-4">
          {avatarUrl && (
            <Image
              width={100}
              height={100}
              src={avatarUrl}
              alt="Avatar"
              className="avatar mb-3 rounded-md"
              style={{ height: 100, width: 100 }}
            />
          )}
          <Avatar setSelectedFile={setSelectedFile} isLoading={loading} />
        </div>
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
