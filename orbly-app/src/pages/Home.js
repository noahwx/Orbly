import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import HomeFeed from "../components/HomeFeed";
import './styles/Home.css';
import FollowRec from "../components/FollowRec";

const Home = ({
    toggleTheme,
    theme,
    posts,
    handlePostLiked,
    handleFollow,
    publicUser,
    handleUnfollow,
    handlePostUnliked,
    notifications,
}) => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            console.log('user is signed out');
        }
    });

    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out');
            sessionStorage.clear();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        document.title = `Orbly ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
    }, [notifications]);

    return ( 
        <div className='home'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                notifications={notifications}
            />
            <HomeFeed 
                auth={auth}
                authUser={authUser}
                posts={posts}
                theme={theme}
                handlePostLiked={handlePostLiked}
                handlePostUnliked={handlePostUnliked}
            />
            <FollowRec 
                auth={auth}
                authUser={authUser}
                theme={theme}
                handleFollow={handleFollow}
                publicUser={publicUser}
                handleUnfollow={handleUnfollow}
            />
        </div>
    );
}
 
export default Home;