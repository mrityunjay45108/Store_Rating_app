import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useAuth } from './contexts/AuthContext';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; 
import AdminDashboard from './components/Admin/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard'; 
import Navbar from './components/Common/Navbar'; 
import ProtectedRoute from './components/Common/ProtectedRoute';

import '@mantine/core/styles.css';

function App() {
  const { user } = useAuth();

  // Login ke baad redirection path decide karne ke liye
  const getHomePath = () => {
    if (user.role === 'system_administrator') return "/admin-dashboard";
    if (user.role === 'store_owner') return "/owner-dashboard";
    return "/dashboard";
  };

  return (
    <MantineProvider defaultColorScheme="light">
      <BrowserRouter>
        {/* Navbar sirf login ke baad dikhega */}
        {user && <Navbar />} 

        <Routes>
          {/*  Root Path: Hamesha Landing Page dikhayega jab tak user login na ho */}
          <Route 
            path="/" 
            element={!user ? <LandingPage /> : <Navigate to={getHomePath()} replace />} 
          />

          {/*  Auth Routes */}
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to={getHomePath()} replace />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to={getHomePath()} replace />} 
          />

          {/*  Protected Dashboard Routes*/}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['system_administrator']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/owner-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['store_owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={user ? getHomePath() : "/"} replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;