import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../components/Menu";
import ProfileSettingsForm from "../components/ProfileSettingsForm";
import "./styles/ProfileSettings.css"

const ProfileSettings = ({
    toggleTheme,
    theme,
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

    return ( 
        <div className='profile-settings'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
            />
            <h1 className="profile-settings-title">Settings</h1>
            <div className="profile-settings-container">
                <ProfileSettingsForm 
                    auth={auth}
                    authUser={authUser}
                />
            </div>
        </div>
    );
}
 
export default ProfileSettings;