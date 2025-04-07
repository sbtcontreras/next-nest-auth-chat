"use client";
import { Chat } from "./_components/Chat";
import { useUserMustBeLogged } from "@/services/auth/hooks";

export default function Home() {
  const { isAuthenticated } = useUserMustBeLogged();

  if (isAuthenticated) return <Chat />;
}
