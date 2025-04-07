"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/services/chat/dto";
import { format } from "date-fns";

interface MessageItemProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export function Message({ message, isCurrentUser }: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex gap-2",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="size-8">
        <AvatarFallback>
          {message.user.nickname[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-lg p-3 flex flex-col gap-1",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="flex justify-between gap-2">
          <span className="text-xs font-medium">{message.user.nickname}</span>
          <span className="text-xs opacity-70">
            {format(message.createdAt, "HH:mm")}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
