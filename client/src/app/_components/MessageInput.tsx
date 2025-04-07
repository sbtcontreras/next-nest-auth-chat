"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/services/chat/services";

export function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <footer className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          placeholder={"Escribe tu mensaje..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey ? handleSubmit(e) : null
          }
          className="flex-1 resize-none max-h-64 overflow-y-auto"
        />
        <Button
          type="submit"
          size="icon"
          className="self-end"
          disabled={!message.trim()}
        >
          <Send className="size-4" />
        </Button>
      </form>
    </footer>
  );
}
