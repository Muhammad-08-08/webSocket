export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  read?: boolean;
}

export interface CreateNotificationRequest {
  title: string;
  body: string;
  userId: string;
}

export interface NotificationResponse {
  success: boolean;
  message?: string;
  notification?: Notification;
}