import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, arrayUnion, doc, updateDoc, where, query, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';
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
import NotFoundPage from './pages/NotFoundPage';
import Loader from './components/Loader';
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
        postLikes: arrayUnion(authUser?.displayName),
    });
    
    const userRef = doc(db, 'users', post.postAuthor);
    updateDoc(userRef, {
      notifications: arrayUnion({
        notificationID: uuidv4(),
        notificationType: 'like',
        notificationAuthor: authUser.displayName,
        notificationAuthorAvatar: authUser.photoURL,
        notificationPostID: post.postID,
        notificationPostImage: post.postImage,
        notificationPostAuthor: post.postAuthor,
        notificationPostUsername: post.postUsername,
        notificationPostAuthorAvatar: post.postUserImage,
        notificationDate: new Date(),
      }),
    });
  }

  const handlePostUnliked = (post) => {
    const postRef = doc(db, 'posts', post.postID);
    updateDoc(postRef, {
        postLikes: arrayRemove(authUser?.displayName),
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
  }, [publicLink, publicUser.length]);

  const handleFollow = (publicUser) => {

    const userRef = doc(db, 'users', authUser?.uid);
    updateDoc(userRef, {
      following: arrayUnion({
        username: publicUser.username,
        avatar: publicUser.photoURL,
      }),
    });

    const publicUserRef = collection(db, 'users');
    const q = query(publicUserRef, where("username", "==", publicUser.username));
    onSnapshot(q, (snapshot) => {
      const puSnap = snapshot.docs[0];
      const puRef = puSnap.ref;
      updateDoc(puRef, {
        followers: arrayUnion({
          username: authUser?.displayName,
          avatar: authUser?.photoURL,
        }),
      });
    });

  }

  const handleUnfollow = (publicUser) => {

    const userRef = doc(db, 'users', authUser?.uid);
    updateDoc(userRef, {
      following: arrayRemove(publicUser.username),
    });

    const publicUserRef = collection(db, 'users');
    const q = query(publicUserRef, where("username", "==", publicUser.username));
    onSnapshot(q, (snapshot) => {
      const puSnap = snapshot.docs[0];
      const puRef = puSnap.ref;
      updateDoc(puRef, {
        followers: arrayRemove(authUser?.displayName),
      });
    });

  }

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', authUser?.displayName));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNotifications(doc.data().notifications);
        });
      });
    }
    getNotifications();
  }, [authUser?.displayName]);

  useEffect(() => {
    document.title = `Orbly ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
  }, [notifications]);

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
                  handleFollow={handleFollow}
                  publicUser={publicUser}
                  handleUnfollow={handleUnfollow}
                  handlePostUnliked={handlePostUnliked}
                  notifications={notifications}
                />
              </PrivateRoute>
            } />
          <Route path='/explore' element={
            <PrivateRoute>
              <Explore 
                toggleTheme={toggleTheme}
                theme={theme}
                posts={posts}
                authUser={authUser}
                notifications={notifications}
              />
            </PrivateRoute>
          } />
          <Route path='/messages' element={
            <PrivateRoute>
              <Messages 
                toggleTheme={toggleTheme}
                theme={theme}
                notifications={notifications}
              />
            </PrivateRoute>
          } />
          <Route path='/notifications' element={
            <PrivateRoute>
              <Notifications 
                toggleTheme={toggleTheme}
                theme={theme}
                auth={auth}
                authUser={authUser}
                notifications={notifications}
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
                handlePostUnliked={handlePostUnliked}
                notifications={notifications}
              />
            </PrivateRoute>
          } />
          <Route path={`/${authUser?.displayName}/settings`} element={
            <PrivateRoute>
              <ProfileSettings 
                toggleTheme={toggleTheme}
                theme={theme}
                notifications={notifications}
              />
            </PrivateRoute>
          } />
          <Route path={`/${publicLink}`} 
            element={
              <Suspense fallback={<Loader />}>
                <PublicProfile
                  publicUser={publicUser}
                  posts={posts}
                  publicLink={publicLink}
                  toggleTheme={toggleTheme}
                  theme={theme}
                  auth={auth}
                  authUser={authUser}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                  notifications={notifications}
                />
              </Suspense>
            } 
          />
          <Route path='*' element={<Loader 
            theme={theme}
          />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
