import React from "react";
import { Input } from "@/components/ui/input";

export default function Avatar({
  setSelectedFile,
  isLoading
}: {
  setSelectedFile: (selectedFile: File | null) => void;
  isLoading: boolean
}) {
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    } else {
      const file = event.target.files[0];
      setSelectedFile(file)
    }
  };

  return (
    <div className="col-span-3 items-baseline gap-4">
      <div className="w-full">
          <Input
            className="col-span-3"
            type="file"
            id="single"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            onChange={handleFileChange}
            disabled={isLoading}
          />
      </div>
    </div>
  );
}
