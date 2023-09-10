import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader } from "@/components/ui/dialog";

export default function ProfileDialogHeader({
  avatar,
  user_name,
}: {
  avatar: string;
  user_name: string;
}) {
  return (
    <DialogHeader className="relative h-56 rounded-md">
      <div className="absolute z-0 h-full w-full rounded-md bg-slate-300"></div>
      <div className="absolute -bottom-10 left-5 z-10 h-24 w-24 rounded-full border-[7px] border-white">
        <Avatar className="h-full w-full">
          <AvatarImage src={avatar} className="object-cover" alt={user_name} />
          <AvatarFallback>{user_name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </DialogHeader>
  );
}
