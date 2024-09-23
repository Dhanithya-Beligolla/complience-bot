import React, {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'
import ComplianceBot from './components/index2'
import Profile from './components/Profile';
import './App.css'
import { auth } from './components/firebase'
import { useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App ()  {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (

      <Router>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route path="/" element={user ? <Navigate to="/profile" /> : <LoginPage />}/>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/bot" element={<ComplianceBot/>}/>
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <ToastContainer />
               </div> 
            </div>
          </div>
      </Router>
    
  )
}


export default App

