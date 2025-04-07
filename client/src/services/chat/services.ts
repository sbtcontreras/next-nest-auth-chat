import { socketClient } from "../api/websocket";

export const sendMessage = (content: string) => {
  socketClient.emit("sendMessage", { content });
};
