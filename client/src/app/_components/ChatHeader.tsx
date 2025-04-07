import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/services/auth/context";

export function ChatHeader() {
  const { user: me } = useAuth();

  return (
    <header className="flex min-h-14 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarFallback>
            {me?.nickname?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">{me?.nickname}</h2>
          <p className="text-xs text-muted-foreground">{me?.username}</p>
        </div>
      </div>
    </header>
  );
}
