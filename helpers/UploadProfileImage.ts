import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const deleteImage = async (
  userId: string,
  imageSection: "profile" | "banner",
  supabase: SupabaseClient,
) => {
  const previousImagePath = `${userId}/${imageSection}/user`;
  const { error } = await supabase.storage
    .from("avatars")
    .remove([previousImagePath]);
  console.log(error, `deleteImage ERROR`);
};

const upload = async (
  image: File,
  imageSection: "profile" | "banner",
  supabase: SupabaseClient,
  userId: string,
) => {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`${userId}/${imageSection}/user`, image);
  if (error) {
    console.log(error);
    return;
  }
};

const getDownloadUrl = async (
  userId: string,
  imageSection: "profile" | "banner",
  supabase: SupabaseClient,
) => {
  const imagePath = `${userId}/${imageSection}/user`;
  const { data } = supabase.storage.from("avatars").getPublicUrl(imagePath);
  return data.publicUrl;
};

export const uploadImage = async (
  userId: string,
  image: File,
  supabase: SupabaseClient,
  imageSection: "profile" | "banner",
) => {
  await deleteImage(userId, imageSection, supabase);
  await upload(image, imageSection, supabase, userId);
  await getDownloadUrl(userId, imageSection, supabase)
};
