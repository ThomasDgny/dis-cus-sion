"use client";
import React, { useEffect, useState } from "react";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { User } from "@/types/Types";
import { Input } from "@/components/ui/input";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: User["avatar"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<User["avatar"]>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name;
      const filePath = `${uid}/${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="col-span-3 items-baseline gap-4">
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar mb-3 rounded-md"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="col-span-3 rounded-md bg-slate-200 mb-3"
          style={{ height: size, width: size }}
        />
      )}
      <div className="w-full">
        {uploading ? (
          <span className="w-full rounded-md border px-3 py-2 text-sm">
            Uploading ...
          </span>
        ) : (
          <Input
            className="col-span-3"
            type="file"
            id="single"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        )}
      </div>
    </div>
  );
}
