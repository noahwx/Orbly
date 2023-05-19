import React from "react";
import { arrayUnion, doc, updateDoc, where, query, onSnapshot, collection, arrayRemove } from "@firebase/firestore";
import { db } from "../../firebase";
import "./styles/ProfileStatsPub.css";

const ProfileStatsPub = ({
    publicUser,
    posts,
    authUser,
}) => {

    const handleFollow = (publicUser) => {

        const userRef = doc(db, 'users', authUser.uid);
        updateDoc(userRef, {
          following: arrayUnion(publicUser[0].username),
        });
    
        const publicUserRef = collection(db, 'users');
        const q = query(publicUserRef, where("username", "==", publicUser[0].username));
        onSnapshot(q, (snapshot) => {
          const puSnap = snapshot.docs[0];
          const puRef = puSnap.ref;
          updateDoc(puRef, {
            followers: arrayUnion(window.sessionStorage.getItem('username').replace(/['"]+/g, '')),
          });
        });
    
    }

    const handleUnfollow = (publicUser) => {

        const userRef = doc(db, 'users', authUser.uid);
        updateDoc(userRef, {
          following: arrayRemove(publicUser[0].username),
        });
    
        const publicUserRef = collection(db, 'users');
        const q = query(publicUserRef, where("username", "==", publicUser[0].username));
        onSnapshot(q, (snapshot) => {
          const puSnap = snapshot.docs[0];
          const puRef = puSnap.ref;
          updateDoc(puRef, {
            followers: arrayRemove(window.sessionStorage.getItem('username').replace(/['"]+/g, '')),
          });
        });
    
    }

    return ( 
        <div className="public-profile-stats">
            {publicUser.map((user) => (
                <div className="public-profile-stats-container" key={user.username}>
                    <div className="public-profile-stats-container-header-image">
                        <img src={user.photoURL} alt="profile" />
                    </div>
                    <div className="public-profile-stats-container-header">
                        <div className="public-profile-stats-container-header-username-area">
                            <h1 className="public-profile-stats-container-header-username">{user.username}</h1>
                            {authUser ? user.followers.includes(authUser?.displayName) ?
                                <button className="public-profile-stats-container-header-follow-button">Following</button>
                                :
                                <button className="public-profile-stats-container-header-follow-button" onClick={() => handleFollow(publicUser)}>Follow</button>
                                :
                                null
                            }
                        </div>
                        <div className="public-profile-stats-container-header-stats-posts">
                            <h4 className="public-profile-stats-container-header-post-length">{user.posts} Posts</h4>
                            {user.followers
                                ? <h4 className="public-profile-stats-container-header-followers-length">{user.followers.length} Followers</h4>
                                : <h4 className="public-profile-stats-container-header-followers-length">0 Followers</h4>
                            }
                            {user.following
                                ? <h4 className="public-profile-stats-container-header-following-length">{user.following.length} Following</h4>
                                : <h4 className="public-profile-stats-container-header-following-length">0 Following</h4>
                            }
                        </div>
                        <div className="public-profile-stats-container-header-bottom">
                            <h4 className="public-profile-stats-container-header-name">{user.firstName + ' ' + user.lastName}</h4>
                            <p className="public-profile-stats-container-header-bio">{user.bio}</p>
                            <p className="public-profile-stats-container-header-website">{user.website}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default ProfileStatsPub;