
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import DashBoard from './components/Dashboard/DashBoard';
import PrivateRoute from './components/SpecialRoutes/PrivateRoute'; 
import ClassRoute from './components/SpecialRoutes/ClassRoute';
import AdminRoute from './components/SpecialRoutes/AdminRoute';
import ClassPage from './components/ClassPage/ClassPage';
import AdminPage from './components/AdminPage/AdminPage';
import Test from './TEST/Test';

function App() {
  
  document.title = "trackMe";

  return (

    <div className = "App">

      <AuthProvider> 
        
        <Routes> 
          
          <Route path = "/login" element = { < Login /> } />
          <Route path = "/admin" element = { <PrivateRoute> <AdminRoute> <AdminPage /> </AdminRoute></PrivateRoute> } />
          
          <Route path = "/" element = { <PrivateRoute> < DashBoard /> </PrivateRoute> } />             
          <Route path = "/class/:class_id" element = { <PrivateRoute> <ClassRoute> <ClassPage /> </ClassRoute> </PrivateRoute> } />

          <Route path = "*" element = { <Navigate to = "/" /> } />

          <Route path = "/test" element = { <Test /> } />

        </Routes>

      </AuthProvider>

    </div>

  );
}

export default App;
