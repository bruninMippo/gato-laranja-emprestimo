
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import LoanFormScreen from './components/LoanFormScreen';
import MyRequestsScreen from './components/MyRequestsScreen';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminDetails from './components/AdminDetails';
import { Screen, Application } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Load applications from local storage
  useEffect(() => {
    const saved = localStorage.getItem('gato_laranja_apps');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  // Save applications to local storage
  const saveApps = (newApps: Application[]) => {
    setApplications(newApps);
    localStorage.setItem('gato_laranja_apps', JSON.stringify(newApps));
  };

  const navigateTo = (screen: Screen, appId?: string) => {
    if (appId) setSelectedAppId(appId);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const addApplication = (app: Application) => {
    saveApps([app, ...applications]);
  };

  const updateAppStatus = (id: string, status: Application['status']) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    saveApps(updated);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen onSelect={(screen) => navigateTo(screen)} />;
      case Screen.MY_REQUESTS:
        return <MyRequestsScreen applications={applications} onBack={() => navigateTo(Screen.HOME)} />;
      case Screen.ADMIN_LOGIN:
        return <AdminLogin onLoginSuccess={() => navigateTo(Screen.ADMIN_DASHBOARD)} onBack={() => navigateTo(Screen.HOME)} />;
      case Screen.ADMIN_DASHBOARD:
        return (
          <AdminDashboard 
            applications={applications} 
            onSelectApp={(id) => navigateTo(Screen.ADMIN_DETAILS, id)} 
            onLogout={() => navigateTo(Screen.HOME)} 
          />
        );
      case Screen.ADMIN_DETAILS:
        const app = applications.find(a => a.id === selectedAppId);
        return app ? (
          <AdminDetails 
            app={app} 
            onUpdateStatus={updateAppStatus} 
            onBack={() => navigateTo(Screen.ADMIN_DASHBOARD)} 
          />
        ) : null;
      case Screen.PERSONAL:
      case Screen.DRIVERS:
      case Screen.BUSINESS:
      case Screen.NEGATIVE:
        return (
          <LoanFormScreen 
            type={currentScreen} 
            onSubmit={addApplication}
            onBack={() => navigateTo(Screen.HOME)} 
          />
        );
      default:
        return <HomeScreen onSelect={(screen) => navigateTo(screen)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-zinc-800">
      <Header onLogoClick={() => navigateTo(Screen.HOME)} />
      
      <main className="flex-1 pb-8">
        {renderScreen()}
      </main>

      <footer className="py-4 text-center border-t border-zinc-900 flex flex-col gap-2">
        <span className="text-zinc-600 text-xs">&copy; 2024 Gato Laranja Empréstimos S.A.</span>
        <button 
          onClick={() => navigateTo(Screen.ADMIN_LOGIN)}
          className="text-zinc-800 hover:text-[#ff8c00] text-[10px] uppercase font-bold tracking-tighter transition-colors"
        >
          Área do Administrador
        </button>
      </footer>
    </div>
  );
};

export default App;
