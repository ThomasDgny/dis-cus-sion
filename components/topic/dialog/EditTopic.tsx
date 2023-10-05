import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTopicTitle from "./dialog-edit-sections/EditTitle";
import EditDescription from "./dialog-edit-sections/EditDescription";
import { Topics } from "@/types/Types";
import DeleteTopic from "./dialog-edit-sections/DeleteTopic";

export function EditTopic({ topicData }: { topicData: Topics }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EditTopicTitle topicData={topicData} />
          <EditDescription topicData={topicData} />
          <DeleteTopic topicID={topicData.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
