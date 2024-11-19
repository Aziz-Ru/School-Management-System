import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NO_AVATAR_URL } from "@/lib/data";
import { Teacher } from "@/lib/types";
import Image from "next/image";

const Teacher_card = ({ profile }: { profile: Teacher }) => {
  return (
    <Card className="w-72">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            src={NO_AVATAR_URL}
            width={40}
            height={40}
            alt="profile"
          />
          <CardTitle>{`${profile.first_name} ${profile.last_name}`}</CardTitle>
        </div>
        <CardDescription>ID:{profile.teacher_id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>Level: {profile.level}</CardDescription>
        <CardDescription>Rank:{profile.rank}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Teacher_card;
