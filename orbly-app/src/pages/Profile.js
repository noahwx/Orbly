import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import Menu from "../components/Menu";
import ProfileStats from "../components/ProfileStats";
import ProfilePosts from "../components/ProfilePost";
import "./styles/Profile.css";

const Profile = ({
    toggleTheme,
    theme,
    handleCreatePost,
    posts,
    handlePostLiked,
    notifications,
}) => {
    
    const navigate = useNavigate();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            console.log('user is signed out');
        }
    });
    
    const [authUser, setAuthUser] = useState(null);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out');
            sessionStorage.clear();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    const [changeProfile, setChangeProfile] = React.useState(false);
    const changeProfileRef = React.useRef(changeProfile);

    const handleChangeProfile = () => {
        setChangeProfile(!changeProfile);
    }

    const handleOutsideClick = (e) => {
        if(changeProfileRef.current && changeProfile && !changeProfileRef.current.contains(e.target)){
            setChangeProfile(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');
    
    const [user, setUser] = React.useState([]);

    React.useEffect(() => {
        const db = getFirestore();
        const userRef = doc(db, "users", uid);
        onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
            setUser(doc.data());
        } else {
            console.log("No such document!");
        }
        });
    }, [uid]);

    useEffect(() => {
        document.title = `Orbly - ${authUser?.displayName} ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
    }, [ authUser, notifications ]);

    return ( 
        <div className='profile'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                handleCreatePost={handleCreatePost}
                notifications={notifications}
            />
            <ProfileStats 
                auth={auth}
                authUser={authUser}
                handleChangeProfile={handleChangeProfile}
                posts={posts}
                user={user}
            />
            <ProfilePosts 
                auth={auth}
                authUser={authUser}
                posts={posts}
                user={user}
                handlePostLiked={handlePostLiked}
                theme={theme}
            />
        </div>
    );
}
 
export default Profile;