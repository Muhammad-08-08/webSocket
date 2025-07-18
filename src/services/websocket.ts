import { Notification } from '../types';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;

  connect(userId: string, onMessage: (notification: Notification) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = `wss://api-auction.tenzorsoft.uz/ws/topic/notification/getAllNotifications/${userId}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const notification = JSON.parse(event.data);
            onMessage(notification);
          } catch (error) {
            console.error('Failed to parse notification:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          this.attemptReconnect(userId, onMessage);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(new Error('WebSocket connection failed. Please check network and server availability.'));
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect(userId: string, onMessage: (notification: Notification) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect(userId, onMessage);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const webSocketService = new WebSocketService();