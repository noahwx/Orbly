import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {

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
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <div className='auth-details'>
            <h5>Auth Details</h5>
            <div>
                <p>Auth User: {authUser ? authUser.email : 'None'}</p>
                <p>Auth User ID: {authUser ? authUser.uid : 'None'}</p>
                <p>
                    {authUser ? 'signed in' : 'signed out'}
                </p>
            </div>
            {authUser ? <button onClick={() => handleSignOut()}>Sign Out</button> : null}
        </div>
                
    );
}
 
export default AuthDetails;