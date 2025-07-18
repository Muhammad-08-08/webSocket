import React, { useState, useEffect } from 'react';
import { Bell, User, ArrowLeft } from 'lucide-react';
import { Notification } from '../types';
import { NotificationList } from '../components/NotificationList';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { webSocketService } from '../services/websocket';

interface UserDashboardProps {
  userId: string;
  onBack: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ userId, onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleNewNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Update unread count
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const connectWebSocket = async () => {
    try {
      setIsConnecting(true);
      await webSocketService.connect(userId, handleNewNotification);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      webSocketService.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(webSocketService.isConnected());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">User Dashboard</h1>
                  <p className="text-sm text-gray-500">User ID: {userId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unreadCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                  <Bell className="h-4 w-4" />
                  <span>{unreadCount} unread</span>
                </div>
              )}
              <ConnectionStatus isConnected={isConnected} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Bell className="h-4 w-4" />
              <span>{notifications.length} total</span>
            </div>
          </div>

          {isConnecting ? (
            <LoadingSpinner size="lg" className="min-h-[200px]" />
          ) : (
            <NotificationList 
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
            />
          )}
        </div>
      </div>
    </div>
  );
};