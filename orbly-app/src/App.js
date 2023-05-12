import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, arrayUnion, doc, updateDoc, where, query } from 'firebase/firestore';
import { db } from './firebase';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './pages/Home';
import ResetPassword from './components/auth/ResetPassword';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import PublicProfile from './pages/PublicProfile';
import './App.css';

/// Version 0.2.000

function App() {

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        console.log("No user");
      }
    });
  }, [auth]);

  const [authUser, setAuthUser] = useState(null);

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

  const publicLink = window.location.pathname.split('/')[1];
  const [posts, setPosts] = React.useState([]);
  const [publicUser, setPublicUser] = useState([]);

  const toggleTheme = () => {
    if (theme === 'light') {
        setTheme('dark');
        window.localStorage.setItem('theme', 'dark');
    } else {
        setTheme('light');
        window.localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const postRef = collection(db, 'posts');
      onSnapshot(postRef, (snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setPosts(posts);
      });
    }
    getPosts();
  }, []);

  const handlePostLiked = (post) => {
    const postRef = doc(db, 'posts', post.postID);
    updateDoc(postRef, {
        postLikes: arrayUnion(window.sessionStorage.getItem('username').replace(/['"]+/g, '')),
    });
  }

  useEffect(() => {
    const getPublicUser = async () => {
      const userRef = collection(db, 'users');
      const q = query(userRef, where("username", "==", publicLink));
      onSnapshot(q, (snapshot) => {
        const publicUser = snapshot.docs.map(doc => doc.data());
        setPublicUser(publicUser);
      });
    }
    getPublicUser();
  }, [publicLink]);    

  useEffect(() => {
    document.title = 'Orbly';
  }, []);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/home'
            element={
              <PrivateRoute>
                <Home 
                  toggleTheme={toggleTheme}
                  theme={theme}
                  handlePostLiked={handlePostLiked}
                  posts={posts}
                />
              </PrivateRoute>
            } />
          <Route path='/explore' element={
            <PrivateRoute>
              <Explore 
                toggleTheme={toggleTheme}
                theme={theme}
                posts={posts}
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
          <Route path={`/${authUser?.displayName}`} element={
            <PrivateRoute>
              <Profile 
                toggleTheme={toggleTheme}
                theme={theme}
                posts={posts}
                handlePostLiked={handlePostLiked}
              />
            </PrivateRoute>
          } />
          <Route path={`/${authUser?.displayName}/settings`} element={
            <PrivateRoute>
              <ProfileSettings 
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </PrivateRoute>
          } />
          <Route path={`/${publicLink}`} 
            element={<PublicProfile
              publicUser={publicUser}
              posts={posts}
              publicLink={publicLink}
              toggleTheme={toggleTheme}
              theme={theme}
              auth={auth}
              authUser={authUser}
            />} 
          />
          <Route path='*' element={<h1>Error</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
