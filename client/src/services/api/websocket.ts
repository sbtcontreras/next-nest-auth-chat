import { io, Socket } from "socket.io-client";
import { envConfig } from "@/config";
import { authService } from "../auth/services";

class SocketClient {
  private static instance: SocketClient;
  public socket: Socket | null = null;

  private constructor() {}

  static getInstance() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  connect() {
    if (!this.socket) {
      const token = authService.getCurrentToken();
      this.socket = io(envConfig.webSocketUrl, { auth: { token } });
    }
  }

  on<T>(event: string, callback: (data: T) => void) {
    this.socket?.on(event, callback);
  }

  emit(event: string, payload: unknown) {
    this.socket?.emit(event, payload);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketClient = SocketClient.getInstance();
