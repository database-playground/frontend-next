import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AppAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string | null;
  name: string;
}

export default function AppAvatar({ src, name, ...props }: AppAvatarProps) {
  return (
    <Avatar {...props}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{name ? name.charAt(0) : "?"}</AvatarFallback>
    </Avatar>
  );
}
