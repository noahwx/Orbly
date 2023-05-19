import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import VerifiedCheck from "../Assets/VerifiedCheck.svg";
import "./styles/FollowRec.css";

const FollowRec = ({
    auth,
    authUser,
    handleFollow,
    theme,
    handleUnfollow,
}) => {

    const navigate = useNavigate();

    const [publicUsers, setPublicUsers] = useState([]);

    useEffect(() => {
        const getPublicUsers = async () => {
            const userRef = collection(db, "users");
            const q = query(userRef, where("private", "==", false));
            onSnapshot(q, (snapshot) => {
                const publicUsers = snapshot.docs.map(doc => doc.data());
                setPublicUsers(publicUsers);
            });
        };
        getPublicUsers();
    }, []);

    return ( 
        <>  
            <div className='follow-rec-container'>
                <div className='follow-rec-header'>
                    <h2 className="follow-rec-header-text">Who to follow</h2>
                </div>
                {publicUsers.filter((publicUser) => publicUser.username !== authUser?.displayName).slice(0, 3).map((publicUser) => (
                    <div className='follow-rec-user' key={publicUser.username}>
                        <div className='follow-rec-user-info' onClick={() => {navigate(`/${publicUser.username}`);}}>
                            <div className='follow-rec-user-info-left'>
                                <img className='follow-rec-user-img' src={publicUser.photoURL} alt='profile pic' />
                            </div>
                            <div className='follow-rec-user-info-center'>
                                <div className='follow-rec-user-info-center-top'>
                                    <h3 className='follow-rec-user-name'>{publicUser.firstName + ' ' + publicUser.lastName}</h3>
                                    <p className='follow-rec-user-username'>@{publicUser.username}</p>
                                    {publicUser.userVerified ?
                                        <img className='follow-rec-user-verified' src={VerifiedCheck} alt='verified' />
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div className='follow-rec-user-follow'>
                            {publicUser.followers.filter((follower) => follower.username === authUser?.displayName).length > 0 ?
                                <button className='follow-rec-user-following-btn'>Following</button>
                            :
                                <button className='follow-rec-user-follow-btn' onClick={() => handleFollow(publicUser)}>Follow</button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
 
export default FollowRec;