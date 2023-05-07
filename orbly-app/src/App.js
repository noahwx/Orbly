import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import './App.css';
import Home from './pages/Home';
import ResetPassword from './components/auth/ResetPassword';

/// Version 0.1.000

function App() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {

    }
  });

  const PrivateRoute = ({ children }) => {
    const user = sessionStorage.getItem("user");
  
    if (user) {
      console.log("Yes, user exist");
    } else {
      console.log("No user");
    }
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
