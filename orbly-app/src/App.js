import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import './App.css';
import Home from './pages/Home';
import ResetPassword from './components/auth/ResetPassword';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';

/// Version 0.2.000

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

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  };

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/home' element={
            <PrivateRoute>
              <Home 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path='/explore' element={
            <PrivateRoute>
              <Explore 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path='/messages' element={
            <PrivateRoute>
              <Messages 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path='/notifications' element={
            <PrivateRoute>
              <Notifications 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path='/:username' element={
            <PrivateRoute>
              <Profile 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path='/account/settings' element={
            <PrivateRoute>
              <ProfileSettings 
                toggleTheme={toggleTheme}
                theme={theme}
              />
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
