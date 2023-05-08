import React, { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import './styles/Home.css';

const Home = ({
    toggleTheme,
    theme,
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

    return ( 
        <div className='home'>
            <h1>Home</h1>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
            />
            {authUser ? <button onClick={() => handleSignOut()}>Sign Out</button> : null}
        </div>
    );
}
 
export default Home;