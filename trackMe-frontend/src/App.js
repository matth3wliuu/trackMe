
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import DashBoard from './components/Dashboard/DashBoard';
import PrivateRoute from './components/PrivateRoute'; 
import ClassRoute from './components/ClassRoute';

function App() {
  
  document.title = "trackMe";

  return (

    <div className = "App">

      <AuthProvider> 
        
        <Routes> 
          
          <Route path = "/login" element = { < Login /> } />
          <Route path = "/" element = { <PrivateRoute> < DashBoard /> </PrivateRoute>  } />
          <Route path = "/admin" element = { <PrivateRoute> </PrivateRoute> } />
          <Route path = "/class/:class_id" element = { <ClassRoute> </ClassRoute> } />

        </Routes>

      </AuthProvider>

    </div>

  );
}

export default App;
