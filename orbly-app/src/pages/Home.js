import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import HomeFeed from "../components/HomeFeed";
import './styles/Home.css';

const Home = ({
    toggleTheme,
    theme,
    posts,
    handlePostLiked,
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
        document.title = 'Orbly';
    }, []);

    return ( 
        <div className='home'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
            />
            <HomeFeed 
                auth={auth}
                authUser={authUser}
                posts={posts}
                theme={theme}
                handlePostLiked={handlePostLiked}
            />
        </div>
    );
}
 
export default Home;