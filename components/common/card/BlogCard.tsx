import { CircleIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { TimeConverter } from "@/utils/TimeConverter";

import { Button } from "@/components/ui/button";

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
import Image from "next/image";

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
      <Link href={uuid}>
        <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{TimeConverter(timestamp)}</CardDescription>
            <CardDescription>{desc}</CardDescription>
          </div>
          <div>
            <Button variant="outline">
              <BookmarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-x-2 text-sm text-muted-foreground">
            <div className="flex gap-2 items-center">
              <Image
                src={""}
                alt={authorData.user_name}
                height={300}
                width={300}
                className="rounded-full w-5 h-5 bg-black"
              />
              <p className="font-medium">{authorData.user_name}</p>
            </div>
            &#x2022;
            <div className="flex items-center">{category}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
