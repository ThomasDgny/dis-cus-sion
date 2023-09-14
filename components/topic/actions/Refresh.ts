import { Database } from "@/lib/database.type";
import { Topics } from "@/types/Types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>();

export default async function refresh(
  topicID: string,
  setData: React.Dispatch<React.SetStateAction<Topics | undefined>>,

) {
  const { data } = await supabase
    .from("topics")
    .select()
    .eq("id", topicID)
    .single();
  setData(data ?? undefined);
}
