import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { StudentDashboard } from './components/StudentDashboard';
import { SubmitFeedback } from './components/SubmitFeedback';
import { MyFeedbacks } from './components/MyFeedbacks';
import { AdminDashboard } from './components/AdminDashboard';
import { ManageFeedback } from './components/ManageFeedback';
import { FeedbackDetails } from './components/FeedbackDetails';
import { LogoutModal } from './components/LogoutModal';
import { useAuth } from './contexts/AuthContext';

interface User {
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export default function App() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Update currentPage based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setCurrentPage('dashboard');
    else if (path === '/submit') setCurrentPage('submit');
    else if (path === '/my-feedbacks') setCurrentPage('my-feedbacks');
    else if (path === '/manage-feedback') setCurrentPage('manage-feedback');
    else if (path.startsWith('/feedback/')) {
      // For feedback details, set the active tab based on user role
      setCurrentPage(user?.role === 'admin' ? 'manage-feedback' : 'my-feedbacks');
    }
    else if (path === '/') setCurrentPage('landing');
    else if (path === '/login') setCurrentPage('login');
    else if (path === '/register') setCurrentPage('register');
  }, [location.pathname, user?.role]);

  // Map backend user to frontend user format
  const currentUser: User | null = user
    ? {
        name: user.fullname,
        email: user.email,
        role: user.role === 'admin' ? 'admin' : 'student',
      }
    : null;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated && currentUser ? (
              currentUser.role === 'student' ? (
                <DashboardLayout
                  userName={currentUser.name}
                  userRole="student"
                  activeTab={currentPage}
                  onLogout={handleLogout}
                >
                  <StudentDashboard />
                </DashboardLayout>
              ) : (
                <DashboardLayout
                  userName={currentUser.name}
                  userRole="admin"
                  activeTab={currentPage}
                  onLogout={handleLogout}
                >
                  <AdminDashboard />
                </DashboardLayout>
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/submit" 
          element={
            isAuthenticated && currentUser?.role === 'student' ? (
              <DashboardLayout
                userName={currentUser.name}
                userRole="student"
                activeTab="submit"
                onLogout={handleLogout}
              >
                <SubmitFeedback />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/my-feedbacks" 
          element={
            isAuthenticated && currentUser?.role === 'student' ? (
              <DashboardLayout
                userName={currentUser.name}
                userRole="student"
                activeTab="my-feedbacks"
                onLogout={handleLogout}
              >
                <MyFeedbacks />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/manage-feedback" 
          element={
            isAuthenticated && currentUser?.role === 'admin' ? (
              <DashboardLayout
                userName={currentUser.name}
                userRole="admin"
                activeTab="manage-feedback"
                onLogout={handleLogout}
              >
                <ManageFeedback />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/feedback/:id" 
          element={
            isAuthenticated && currentUser ? (
              <DashboardLayout
                userName={currentUser.name}
                userRole={currentUser.role}
                activeTab={currentUser.role === 'admin' ? 'manage-feedback' : 'my-feedbacks'}
                onLogout={handleLogout}
              >
                <FeedbackDetails />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
      <Toaster position="top-right" duration={3000} />
    </>
  );
}
