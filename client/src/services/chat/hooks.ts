import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { ChatMessage, ChatUser, UpdateProfileDTO } from "./dto";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socketClient } from "../api/websocket";
import { useSettingsModal } from "@/app/_components/UpdateProfile";
import { toast } from "sonner";
import { useAuth } from "../auth/context";

export const useChatMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => apiClient<ChatMessage[]>("/chat/messages"),
    staleTime: Infinity,
  });
};

export const useChatUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient<ChatUser[]>("/chat/users"),
    staleTime: Infinity,
  });
};

export function useUpdateProfile() {
  const { closeModal } = useSettingsModal.getState();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateProfileDTO) =>
      apiClient(`/chat/profile`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toast.success("Perfil actualizado con éxito");
      logout();
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export const useChatEventListener = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socketClient.socket) {
      return;
    }

    socketClient.connect();

    const handleNewMessage = (message: ChatMessage) => {
      queryClient.setQueryData<ChatMessage[]>(["messages"], (old) => {
        return old ? [...old, message] : [message];
      });
    };

    const handleUserConnected = (user: ChatUser) => {
      queryClient.setQueryData<ChatUser[]>(["users"], (old) => {
        return old ? [...old, user] : [user];
      });
    };

    const handleUserDisconnected = (user: ChatUser) => {
      queryClient.setQueryData<ChatUser[]>(["users"], (old) => {
        return old ? old.filter((u) => u.id !== user.id) : [];
      });
    };

    socketClient.on("newMessage", handleNewMessage);
    socketClient.on("userConnected", handleUserConnected);
    socketClient.on("userDisconnected", handleUserDisconnected);
  }, [queryClient]);
};
