"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { FormEvent, useEffect, useState } from "react";
import AvatarUpload from "../avatar-upload/AvatarUpload";
import Image from "next/image";
import { uploadImage } from "@/helpers/UploadProfileImage";

export default function EditBanner() {
  const supabase = createClientComponentClient<Database>();
  const { user, getSessionUserData } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setBannerUrl(fileReader.result as string);
    };
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    } else {
      setBannerUrl(null);
    }
  }, [selectedFile]);

  const updateUserImgUrl = async (publicUrl: string | null) => {
    const { error } = await supabase
      .from("users")
      .update({
        banner: publicUrl,
      })
      .eq("id", user?.id);

    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again.",
      });
      return;
    } else {
      setSelectedFile(null);
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
    await uploadImage(user!.id, selectedFile, supabase, "banner");
    await updateUserImgUrl(bannerUrl);
    getSessionUserData(user!.id);
    setLoading(false);
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 items-baseline gap-4"
        onSubmit={handleUpdateProfile}
      >
        <Label htmlFor="picture" className="text-right">
          Banner Image
        </Label>
        <div className="col-span-3 items-baseline gap-4">
          {bannerUrl && (
            <Image
              width={100}
              height={300}
              src={bannerUrl}
              alt="Banner"
              className="banner mb-3 rounded-md object-cover"
              style={{ height: 100, width: 100 }}
            />
          )}
          <AvatarUpload
            setSelectedFile={setSelectedFile}
            isLoading={loading}
            selectedFile={selectedFile}
          />
        </div>
        <Button type="submit" variant={"ghost"} disabled={loading}>
          {!loading ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
