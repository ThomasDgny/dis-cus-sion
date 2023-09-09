import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "../../../../node_modules/lucide-react";

export default function Avatar({
  selectedFile,
  setSelectedFile,
  isLoading,
  maxSizeInMb = 2,
}: {
  selectedFile: File | null;
  setSelectedFile: (selectedFile: File | null) => void;
  isLoading: boolean;
  maxSizeInMb? : number
}) {

 const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

      if (fileSizeInMegabytes > maxSizeInMb) {
        alert(`Size limit is ${maxSizeInMb.toFixed(2)} MB`);
        event.target.value = "";
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleDiscard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedFile(null);
  };

  return (
    <div className="col-span-3 items-baseline gap-4">
      <div className="w-full">
        <Input
          className="col-span-3 cursor-pointer"
          type="file"
          id="single"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {selectedFile && (
          <div className="px-3">
            <Button variant="destructive" onClick={handleDiscard}>
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
