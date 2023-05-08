import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../components/Menu";
import ProfileStats from "../components/ProfileStats";
import ChangeProfilePicModal from "../components/ChangeProfilePicModal";
import "./styles/Profile.css";

const Profile = ({
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

    React.useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    return ( 
        <div className='profile'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
            />
            <ProfileStats 
                auth={auth}
                authUser={authUser}
                handleChangeProfile={handleChangeProfile}
            />
            <ChangeProfilePicModal 
                auth={auth}
                changeProfile={changeProfile}
                setChangeProfile={setChangeProfile}
                changeProfileRef={changeProfileRef}
                handleChangeProfile={handleChangeProfile}
            />
        </div>
    );
}
 
export default Profile;