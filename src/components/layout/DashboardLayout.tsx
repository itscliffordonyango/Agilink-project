import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  Wallet, 
  MessageSquare, 
  User, 
  Settings,
  Bell,
  ArrowLeft
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const common = [
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Chat', href: '/chat', icon: MessageSquare },
      { name: 'Wallet', href: '/wallet', icon: Wallet },
    ];

    switch (user?.role) {
      case 'client':
        return [
          { name: 'Dashboard', href: '/client', icon: Users },
          { name: 'Marketplace', href: '/marketplace', icon: MapPin },
          { name: 'Projects', href: '/projects', icon: Settings },
          ...common,
        ];
      case 'farmer':
        return [
          { name: 'Dashboard', href: '/farmer', icon: Users },
          { name: 'Projects', href: '/projects', icon: Settings },
          ...common,
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin', icon: Users },
          { name: 'Users', href: '/admin/users', icon: User },
          { name: 'Projects', href: '/admin/projects', icon: Settings },
          { name: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      default:
        return common;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-lg mr-3"></div>
                <span className="text-xl font-bold text-gray-900">AgriLink</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>

              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
