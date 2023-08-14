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
import { users } from "@/mock/Users";
import SaveButton from "./SaveButton";
import DirectProfileButton from "./DirectProfileButton";

export function BlogCard({
  category,
  desc,
  title,
  timestamp,
  uuid,
  author_id,
}: BlogEntry) {
  const FindCurrentBlog = (db: User[], author_id: string) => {
    return db.find((item) => item.uuid === author_id);
  };

  const authorData = FindCurrentBlog(users, author_id);
  if (!authorData) return null;

  return (
    <Card className="cursor-pointer transition-all hover:bg-slate-100">
      <Link href={`/topic/${uuid}`}>
        <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{TimeConverter(timestamp)}</CardDescription>
            <CardDescription>{desc}</CardDescription>
          </div>
          <div>
            <SaveButton cardID={uuid} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <DirectProfileButton authorData={authorData} />
            &#x2022;
            <div className="flex items-center">{category}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
