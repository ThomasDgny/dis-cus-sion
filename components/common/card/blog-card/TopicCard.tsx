import { dateConverter } from "@/utils/dateConverter";
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
import { RemoveButton } from "./_components/DeleteButton";

interface TopicCardProps {
  topicData: Topics;
  authorData: User | null;
  isSaved?: boolean;
}

export function TopicCard({ topicData, authorData, isSaved }: TopicCardProps) {
  const { category, desc, id, timestamp, title } = topicData;

  const isTopicSaved = isSaved ? (
    <RemoveButton topicID={id} title={title}/>
  ) : (
    <SaveButton cardID={id} title={title} />
  );

  if (!authorData) return null;

  return (
    <Card className="flex h-64 cursor-pointer flex-col justify-between transition-all hover:bg-slate-100">
      <Link href={`/topic/${id}`}>
        <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
          <div className="space-y-3">
            <CardTitle className="line-clamp-2 break-all text-xl leading-8">
              {title}
            </CardTitle>
            <CardDescription>{dateConverter(timestamp)}</CardDescription>
            <CardDescription className="line-clamp-2 break-all">
              {desc}
            </CardDescription>
          </div>
          <div>{isTopicSaved}</div>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
          <TopicCardDisplayProfileButton authorData={authorData} />
          &#x2022;
          <div className="flex items-center">{category}</div>
        </div>
      </CardContent>
    </Card>
  );
}
