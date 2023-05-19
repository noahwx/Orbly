import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../components/Menu";
import ProfileSettingsForm from "../components/ProfileSettingsForm";
import "./styles/ProfileSettings.css"
import ResetPasswordModal from "../components/auth/ResetPasswordModal";

const ProfileSettings = ({
    toggleTheme,
    theme,
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

    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const openChangePasswordModalRef = useRef(null);

    const handleOpenChangePasswordModal = () => {
        setOpenChangePasswordModal(!openChangePasswordModal);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(openChangePasswordModalRef.current && openChangePasswordModal && !openChangePasswordModalRef.current.contains(e.target)){
                setOpenChangePasswordModal(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [openChangePasswordModal, openChangePasswordModalRef]);

    return ( 
        <div className='profile-settings'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                notifications={notifications}
            />
            <h1 className="profile-settings-title">Settings</h1>
            <div className="profile-settings-container">
                <ProfileSettingsForm 
                    auth={auth}
                    authUser={authUser}
                    handleOpenChangePasswordModal={handleOpenChangePasswordModal}
                />
            </div>
            {openChangePasswordModal &&
                <ResetPasswordModal 
                    auth={auth}
                    authUser={authUser}
                    openChangePasswordModal={openChangePasswordModal}
                    openChangePasswordModalRef={openChangePasswordModalRef}
                    handleOpenChangePasswordModal={handleOpenChangePasswordModal}
                    theme={theme}
                />
            }
        </div>
    );
}
 
export default ProfileSettings;