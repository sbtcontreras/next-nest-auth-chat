"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useChatEventListener } from "@/services/chat/hooks";

export function Chat() {
  useChatEventListener();

  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset className="h-dvh">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </SidebarInset>
    </SidebarProvider>
  );
}
