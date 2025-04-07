"use client";

import { LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SettingsModal, useSettingsModal } from "./UpdateProfile";
import { useChatUsers } from "@/services/chat/hooks";
import { cn } from "@/lib/utils";
import { useAuth } from "@/services/auth/context";

export function ChatSidebar() {
  const { openModal: openSettingsModal } = useSettingsModal();
  const { data: users = [] } = useChatUsers();
  const { user: me } = useAuth();

  const sortedUsers = users.sort((a, b) =>
    a.id === me?.id
      ? -1
      : b.id === me?.id
      ? 1
      : a.nickname.localeCompare(b.nickname)
  );

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback>
                  <Users className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Chat</span>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto size-8"
                onClick={() => openSettingsModal({ nickname: me?.nickname })}
              >
                <Settings className="size-4" />
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Conectados</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sortedUsers.map((user) => (
                  <SidebarMenuItem key={user?.id}>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <Avatar
                          className={cn(
                            "size-6",
                            user?.id === me?.id && "invert"
                          )}
                        >
                          <AvatarFallback>
                            {user.nickname?.charAt(0).toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.id === me?.id
                            ? `${user.nickname} (Tú)`
                            : user.nickname}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  className="relative flex items-center justify-center font-medium"
                  href="/auth/logout"
                >
                  <LogOut className="absolute left-4" />
                  <span>Cerrar Sesión</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SettingsModal />
    </>
  );
}
