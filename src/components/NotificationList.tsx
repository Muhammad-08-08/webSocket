import React from 'react';
import { Bell, Clock, CheckCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (notificationId: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onMarkAsRead 
}) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
            notification.read 
              ? 'bg-gray-50 border-gray-200' 
              : 'bg-white border-blue-200 shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-400' : 'text-blue-600'}`} />
                <h3 className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notification.title}
                </h3>
                {!notification.read && (
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
              <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                {notification.body}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {formatTime(notification.createdAt)}
              </div>
            </div>
            {!notification.read && onMarkAsRead && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                title="Mark as read"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};