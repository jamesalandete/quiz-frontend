import React, { useEffect, useState } from 'react';
import configureInterceptor from './middleware/Error.interceptor';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import Wizard from './Components/wizard/wizard.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/login/login.component';
import { validateAuth } from './services/login.service';
import * as toast from './helpers/Toast';
import Register from './Components/register/register.component';

function App() {
  // const isAuthenticated = !!localStorage.getItem('userProfile');
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  configureInterceptor();
  useEffect(() => {
    const validate = async () => {
      const isValid: boolean = await validateAuth();
      setIsAuthenticated(isValid)
    };
    validate()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path=''
            element={isAuthenticated ? <Navigate to='/quiz' /> : <Login />}
          />
          <Route
            path='login'
            element={isAuthenticated ? <Navigate to='/quiz' /> : <Login />}
          />
           <Route
            path='register'
            element={<Register />}
          />
          <Route
            path='quiz'
            element={isAuthenticated ? <Wizard /> : <Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
