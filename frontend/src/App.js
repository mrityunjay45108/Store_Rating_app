// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { MantineProvider } from '@mantine/core';
// import { useAuth } from './contexts/AuthContext';

// // Pages & Components Imports
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard'; 
// import AdminDashboard from './components/Admin/AdminDashboard';
// import OwnerDashboard from './pages/OwnerDashboard'; 
// import Navbar from './components/Common/Navbar'; 
// import ProtectedRoute from './components/Common/ProtectedRoute';

// // Styles
// import '@mantine/core/styles.css';

// function App() {
//   const { user } = useAuth();

//   // Helper function for Auth redirection based on roles
//   const getHomePath = () => {
//     if (!user) return "/login";
//     if (user.role === 'system_administrator') return "/admin-dashboard";
//     if (user.role === 'store_owner') return "/owner-dashboard";
//     return "/dashboard";
//   };

//   return (
//     <MantineProvider>
//       <BrowserRouter>
//         {/* Navbar sirf login ke baad dikhega */}
//         {user && <Navbar />} 

//         <Routes>
//           {/* --- Public/Auth Routes --- */}
//           <Route path="/login" element={!user ? <Login /> : <Navigate to={getHomePath()} />} />
//           <Route path="/signup" element={!user ? <Signup /> : <Navigate to={getHomePath()} />} />
          
//           {/* --- Protected Normal User Route --- */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['user']}>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />

//           <Route 
//   path="/admin-dashboard" 
//   element={
//     <ProtectedRoute allowedRoles={['system_administrator']}>
//       <AdminDashboard />
//     </ProtectedRoute>
//   } 
// />
          
//           {/* --- Protected Admin Route --- */}
//           <Route 
//             path="/admin-dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['system_administrator']}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* --- Protected Store Owner Route --- */}
//           <Route 
//             path="/owner-dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['store_owner']}>
//                 <OwnerDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Default & Catch-all Routes */}
//           <Route path="/" element={<Navigate to={getHomePath()} />} />
//           <Route path="*" element={<Navigate to={getHomePath()} />} />
//         </Routes>
//       </BrowserRouter>
//     </MantineProvider>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { MantineProvider } from '@mantine/core';
// import { useAuth } from './contexts/AuthContext';

// // Pages & Components Imports
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard'; 
// import AdminDashboard from './components/Admin/AdminDashboard';
// import OwnerDashboard from './pages/OwnerDashboard'; 
// import Navbar from './components/Common/Navbar'; 
// import ProtectedRoute from './components/Common/ProtectedRoute';

// // Styles
// import '@mantine/core/styles.css';

// function App() {
//   const { user } = useAuth();

//   // Role ke hisaab se home path decide karne ke liye helper
//   const getHomePath = () => {
//     if (!user) return "/login";
//     if (user.role === 'system_administrator') return "/admin-dashboard";
//     if (user.role === 'store_owner') return "/owner-dashboard";
//     return "/dashboard";
//   };

//   return (
//     <MantineProvider defaultColorScheme="light">
//       <BrowserRouter>
//         {/* Navbar sirf login hone par dikhega */}
//         {user && <Navbar />} 

//         <Routes>
//           {/* --- Public Routes --- */}
//           {/* Agar user pehle se login hai toh use uske dashboard par bhej do */}
//           <Route 
//             path="/login" 
//             element={!user ? <Login /> : <Navigate to={getHomePath()} replace />} 
//           />
//           <Route 
//             path="/signup" 
//             element={!user ? <Signup /> : <Navigate to={getHomePath()} replace />} 
//           />

//           {/* --- Protected Admin Routes --- */}
//           <Route 
//             path="/admin-dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['system_administrator']}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* --- Protected Store Owner Route --- */}
//           <Route 
//             path="/owner-dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['store_owner']}>
//                 <OwnerDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* --- Protected Normal User Route --- */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute allowedRoles={['user']}>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* --- Root & Catch-all Routes --- */}
//           <Route path="/" element={<Navigate to={getHomePath()} replace />} />
//           <Route path="*" element={<Navigate to={getHomePath()} replace />} />
//         </Routes>
//       </BrowserRouter>
//     </MantineProvider>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useAuth } from './contexts/AuthContext';

// Pages & Components Imports
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
          {/* 1. Root Path: Hamesha Landing Page dikhayega jab tak user login na ho */}
          <Route 
            path="/" 
            element={!user ? <LandingPage /> : <Navigate to={getHomePath()} replace />} 
          />

          {/* 2. Auth Routes */}
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to={getHomePath()} replace />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to={getHomePath()} replace />} 
          />

          {/* 3. Protected Dashboard Routes*/}
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

          {/* 4. Catch-all: Anjaan paths ko Landing ya Dashboard par bhejo */}
          <Route path="*" element={<Navigate to={user ? getHomePath() : "/"} replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;