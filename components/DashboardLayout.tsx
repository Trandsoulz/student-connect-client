import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, MessageSquare, FileText, Users } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: 'student' | 'admin';
  activeTab: string;
  onNavigate?: (page: string) => void;
  onLogout: () => void;
}

export function DashboardLayout({
  children,
  userName,
  userRole,
  activeTab,
  onNavigate,
  onLogout,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  
  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'submit', label: 'Submit Feedback', icon: MessageSquare, path: '/submit' },
    { id: 'my-feedbacks', label: 'My Feedbacks', icon: FileText, path: '/my-feedbacks' },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'manage-feedback', label: 'Manage Feedback', icon: Users, path: '/manage-feedback' },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1E88E5] to-[#0097A7] flex items-center justify-center">
              <span className="text-white">SC</span>
            </div>
            <h1 className="text-[#1E88E5] text-[18px]">StudentConnect</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {userName}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="hover:bg-[#E3F2FD]"
            >
              <LogOut className="h-5 w-5 text-[#1565C0]" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] text-white'
                      : 'text-foreground hover:bg-[#E3F2FD]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
