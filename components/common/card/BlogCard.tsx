import { CircleIcon,BookmarkIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogEntry } from "@/types/Types";

export function BlogCard({
  category,
  desc,
  title,
  user_name,
  timestamp,
}: BlogEntry) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_55px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <div>
          <Button variant="outline">
            <BookmarkIcon className="h-5 w-5"/>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {user_name}
          </div>
          <div className="flex items-center">{category}</div>
          <div>{timestamp}</div>
        </div>
      </CardContent>
    </Card>
  );
}
