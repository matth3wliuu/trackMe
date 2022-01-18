
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-brands-svg-icons';
import { faCompass, faUserCircle, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login';
import DashBoard from './components/Dashboard/DashBoard';
import PrivateRoute from './components/SpecialRoutes/PrivateRoute'; 
import ClassRoute from './components/SpecialRoutes/ClassRoute';
import ClassPage from './components/ClassPage/ClassPage';
import Test from './TEST/Test';

library.add(faCompass, faUserCircle, faCoffee);

function App() {
  
  document.title = "trackMe";

  return (

    <div className = "App">

      <AuthProvider> 
        
        <Routes> 
          
          <Route path = "/login" element = { < Login /> } />
          <Route path = "/admin" element = { <PrivateRoute> </PrivateRoute> } />
          
          <Route path = "/" element = { <PrivateRoute> < DashBoard /> </PrivateRoute> } />             
          <Route path = "/class/:class_id" element = { <ClassRoute> <ClassPage /> </ClassRoute> } />

          <Route path = "/test" element = { <Test /> } />

        </Routes>

      </AuthProvider>

    </div>

  );
}

export default App;
