import { Notice } from "../utils/types";
import ReadMore from "./buttons/ReadMore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const NoticeCards = ({ notices }: { notices: Notice[] | undefined }) => {
  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">Notices</h1>
      <div className="">
        {notices?.map((notice, index) => {
          return (
            <Card key={index} className="my-4">
              <CardHeader>
                <CardTitle>{notice.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {notice.content.substring(0, 100)}
                  <div className="flex justify-between items-center">
                    <span>{notice.createdAt.toDateString()}</span>
                    <ReadMore href={`/home/notices/${notice.id}`} />
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NoticeCards;
