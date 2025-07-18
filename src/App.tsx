import React, { useState } from 'react';
import { RoleSelection } from './pages/RoleSelection';
import { UserLogin } from './pages/UserLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';

type AppState = {
  role: 'admin' | 'user' | 'login' | null;
  userId?: string;
};

function App() {
  const [appState, setAppState] = useState<AppState>({ role: null });

  const handleRoleSelection = (role: 'admin' | 'user') => {
    if (role === 'user') {
      setAppState({ role: 'login' });
    } else {
      setAppState({ role });
    }
  };

  const handleUserLogin = (userId: string) => {
    setAppState({ role: 'user', userId });
  };

  const handleBack = () => {
    setAppState({ role: null });
  };

  if (!appState.role) {
    return <RoleSelection onSelectRole={handleRoleSelection} />;
  }

  if (appState.role === 'login') {
    return <UserLogin onLogin={handleUserLogin} onBack={handleBack} />;
  }

  if (appState.role === 'admin') {
    return <AdminDashboard onBack={handleBack} />;
  }

  if (appState.role === 'user' && appState.userId) {
    return <UserDashboard userId={appState.userId} onBack={handleBack} />;
  }

  return <RoleSelection onSelectRole={handleRoleSelection} />;
}

export default App;