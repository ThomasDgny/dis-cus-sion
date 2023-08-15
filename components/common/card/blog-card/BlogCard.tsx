import { TimeConverter } from "@/utils/TimeConverter";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogEntry, User } from "@/types/Types";
import Link from "next/link";
import SaveButton from "./SaveButton";
import DirectProfileButton from "./DirectProfileButton";
import { supabase } from "@/db/supabase";

export async function BlogCard({
  category,
  desc,
  title,
  timestamp,
  id,
  author_id,
}: BlogEntry) {

  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", author_id)
    .single()

  const user: User = data ?? [];

  return (
    <Card className="cursor-pointer transition-all hover:bg-slate-100">
      <Link href={`/topic/${id}`}>
        <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{TimeConverter(timestamp)}</CardDescription>
            <CardDescription>{desc}</CardDescription>
          </div>
          <div>
            <SaveButton cardID={id} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <DirectProfileButton authorData={user} />
            &#x2022;
            <div className="flex items-center">{category}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
