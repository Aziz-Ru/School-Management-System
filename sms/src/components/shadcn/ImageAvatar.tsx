import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ImageAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/noavatar.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ImageAvatar;
