import React, { useState, useEffect } from 'react';
import { Settings, Users, ArrowLeft } from 'lucide-react';
import { User, CreateNotificationRequest } from '../types';
import { UserList } from '../components/UserList';
import { SendNotificationForm } from '../components/SendNotificationForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiService } from '../services/api';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const usersData = await apiService.getAllUsers();
      // Ensure usersData is an array to prevent map errors
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        setUsers([]);
        setError('Received invalid user data format from server');
      }
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error loading users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNotification = async (data: CreateNotificationRequest) => {
    try {
      setIsSending(true);
      await apiService.createNotification(data);
    } catch (err) {
      throw new Error('Failed to send notification');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
              <Users className="h-4 w-4" />
              <span>{users.length} users</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner size="lg" className="min-h-[400px]" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadUsers} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <UserList
                users={users}
                selectedUserId={selectedUserId}
                onSelectUser={setSelectedUserId}
              />
            </div>
            
            <div>
              <SendNotificationForm
                selectedUserId={selectedUserId}
                onSendNotification={handleSendNotification}
                isLoading={isSending}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};