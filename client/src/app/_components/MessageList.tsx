"use client";

import { useEffect, useRef } from "react";
import { useChatMessages } from "@/services/chat/hooks";
import { Message } from "./Message";
import { useAuth } from "@/services/auth/context";

export function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: messages = [] } = useChatMessages();
  const { user: me } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 h-full overflow-y-auto">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isCurrentUser={message.user.id === me?.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
