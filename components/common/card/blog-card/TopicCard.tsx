import { DateConverter } from "@/utils/TimeConverter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Topics, User } from "@/types/Types";
import Link from "next/link";
import SaveButton from "./_components/SaveButton";
import TopicCardDisplayProfileButton from "./_components/TopicCardDisplayProfileButton";

interface TopicCardProps {
  topicData: Topics;
  authorData: User | null
}

export async function BlogCard({ topicData, authorData }: TopicCardProps) {
  const { category, desc, id, timestamp, title } = topicData;
  if (!authorData) return null;

  return (
    <Card className="h-64 cursor-pointer transition-all hover:bg-slate-100">
      <Link
        href={`/topic/${id}`}
        className="flex h-full flex-col justify-between"
      >
        <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle className="line-clamp-2 text-xl leading-8">
              {title}
            </CardTitle>
            <CardDescription>{DateConverter(timestamp)}</CardDescription>
            <CardDescription className="line-clamp-2 ">{desc}</CardDescription>
          </div>
          <div>
            <SaveButton cardID={id} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <TopicCardDisplayProfileButton authorData={authorData} />
            &#x2022;
            <div className="flex items-center">{category}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
