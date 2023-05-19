import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../components/Menu";
import ExplorePost from "../components/ExplorePost";
import CompassDark from "../Assets/CompassDark.svg";
import CompassLight from "../Assets/CompassLight.svg";
import "./styles/Explore.css";

const Explore = ({
    toggleTheme,
    theme,
    handleCreatePost,
    posts,
    setSelectedPost,
    postModalRef,
    postModal,
    handlePostModal,
    selectedPost,
    handlePostLiked,
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
        document.title = `Orbly - Explore ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
    }, [notifications]);

    return ( 
        <div className='explore'>
            <div className='explore-header'>
                <div className="explore-header-items">
                    <h1 className="explore-header-title">{theme === 'light' ? <img src={CompassDark} alt="compass" className="explore-header-image" /> : <img src={CompassLight} alt="compass" className="explore-header-image" /> }&nbsp;Explore</h1>
                </div>
                <p className="explore-header-text">Explore posts from other users.</p>
            </div>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                handleCreatePost={handleCreatePost}
                notifications={notifications}
            />
            <ExplorePost 
                auth={auth}
                authUser={authUser}
                theme={theme}
                toggleTheme={toggleTheme}
                posts={posts}
                setSelectedPost={setSelectedPost}
                postModalRef={postModalRef}
                postModal={postModal}
                handlePostModal={handlePostModal}
                selectedPost={selectedPost}
                handlePostLiked={handlePostLiked}
            />
        </div>
    );
}
 
export default Explore;