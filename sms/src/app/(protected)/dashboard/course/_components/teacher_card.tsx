import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NO_AVATAR_URL } from "@/lib/data";
import { TeacherProfile } from "@/lib/utils/types";
import Image from "next/image";

const Teacher_card = ({ profile }: { profile: TeacherProfile }) => {
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
          <CardTitle>{profile.fullName}</CardTitle>
        </div>
        <CardDescription>ID:{profile.id.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>Email: {profile.email}</CardDescription>
        <CardDescription>Phone: {profile.phone}</CardDescription>
        <CardDescription>Level: {profile.level}</CardDescription>
        <CardDescription>Rank:{profile.rank}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Teacher_card;
