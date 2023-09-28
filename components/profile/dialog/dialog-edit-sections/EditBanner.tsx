"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useEffect, useState } from "react";
import AvatarUpload from "../avatar-upload/AvatarUpload";
import Image from "next/image";
import { uploadImage } from "@/helpers/UploadProfileImage";

interface uploadImageProps {
  userId: string;
  image: File | null;
  imageSection: "avatar" | "banner";
  previousImageUrl: string | null;
}

export default function EditBanner() {
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

  const uploadImageProps: uploadImageProps = {
    userId: user!.id,
    image: selectedFile,
    imageSection: "banner",
    previousImageUrl: user!.banner,
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
    await uploadImage(uploadImageProps);
    setSelectedFile(null);
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
