import React from 'react';
import { Settings, User, Shield, Bell } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'admin' | 'user') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-full shadow-lg">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notification System
          </h1>
          <p className="text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelectRole('admin')}
            className="w-full bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <Settings className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-500">
                  Manage users and send notifications
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('user')}
            className="w-full bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">User</h3>
                <p className="text-sm text-gray-500">
                  Login to receive real-time notifications
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};