import React from 'react';
import { Users, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  selectedUserId?: string;
  onSelectUser: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  selectedUserId, 
  onSelectUser 
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No users available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select User</h3>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md ${
              selectedUserId === user.id
                ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <UserIcon className={`h-5 w-5 ${selectedUserId === user.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <div>
                <p className={`font-medium ${selectedUserId === user.id ? 'text-blue-900' : 'text-gray-900'}`}>
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
                {user.email && (
                  <p className="text-xs text-gray-400">{user.email}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};