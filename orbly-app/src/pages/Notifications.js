import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../components/Menu";
import "./styles/Notifications.css";

const Notifications = ({
    toggleTheme,
    theme,
    handleCreatePost,
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
        document.title = 'Orbly - Notifications';
    }, []);

    return ( 
        <div className='notifications'>
            <h1>Notifications</h1>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                handleCreatePost={handleCreatePost}
            />
        </div>
    );
}
 
export default Notifications;