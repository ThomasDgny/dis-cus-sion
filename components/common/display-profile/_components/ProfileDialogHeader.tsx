import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

export default function ProfileDialogHeader({
  avatar,
  user_name,
  banner,
}: {
  banner: string | null;
  avatar: string;
  user_name: string;
}) {
  return (
    <DialogHeader className="relative h-56 rounded-md">
      <div className="absolute z-0 h-full w-full rounded-md bg-slate-100">
        {banner ? (
          <Image
            src={banner}
            width={1000}
            height={1000}
            alt="user image"
            className="h-full w-full rounded-lg bg-slate-200 object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-xl">{user_name}</p>
          </div>
        )}
      </div>
      <div className="absolute -bottom-10 left-5 z-10 h-24 w-24 rounded-full border-[7px] border-white">
        <Avatar className="h-full w-full">
          <AvatarImage src={avatar} className="object-cover" alt={user_name} />
          <AvatarFallback>{user_name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </DialogHeader>
  );
}
