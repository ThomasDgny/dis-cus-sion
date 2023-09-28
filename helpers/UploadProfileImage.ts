"use client";
import { Database } from "@/lib/database.type";
import { extractImageIdFromUrl } from "@/utils/extractImgIdFromUrl";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const { v4: uuidv4 } = require("uuid");
const supabase = createClientComponentClient<Database>();

interface ImageProps {
  userId: string;
  image: File | null;
  imageSection: "avatar" | "banner";
  previousImageUrl: string | null;
}
interface uploadImageProps extends ImageProps {
  newImageID?: string;
}

const deleteImage = async (props: uploadImageProps) => {
  const previousImagePath = props.previousImageUrl;
  if (previousImagePath) {
    const imageId = extractImageIdFromUrl(previousImagePath);
    const imagePath = `${props.userId}/${props.imageSection}/${imageId}`;

    if (imagePath) {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([imagePath]);
      console.log(error, `deleteImage`);
    }
  }
};

const upload = async (props: uploadImageProps) => {
  const imagePath = `${props.userId}/${props.imageSection}/${props.newImageID}`;
  console.log("imagePath upload", imagePath);
  if (props.image) {
    const { error } = await supabase.storage
      .from("avatars")
      .upload(imagePath, props.image);
    if (error) {
      console.log(error);
    }
  }
};

const getDownloadUrl = async (props: uploadImageProps) => {
  const imagePath = `${props.userId}/${props.imageSection}/${props.newImageID}`;
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(imagePath);
  console.log("publicUrl", publicUrl);
  const updateData: Record<string, string> = {};
  updateData[props.imageSection] = publicUrl;
  if (publicUrl) {
    const { error, data: uploaded } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", props.userId);

    console.log(uploaded);
    if (error) {
      console.log(error);
    }
  }
};

export const uploadImage = async ({
  userId,
  image,
  imageSection,
  previousImageUrl,
}: ImageProps) => {
  const uuid = uuidv4();

  const uploadImageProps: uploadImageProps = {
    userId: userId,
    image: image,
    imageSection: imageSection,
    previousImageUrl: previousImageUrl,
    newImageID: uuid,
  };

  if (image) {
    await deleteImage(uploadImageProps);
    await upload(uploadImageProps);
    await getDownloadUrl(uploadImageProps);
  }
};
