import React from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProfileStats = ({
    handleChangeProfile,
}) => {

    const navigate = useNavigate();

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

    const handleEditProfile = () => {
        navigate('/account/settings');
    }

    return ( 
        <div className='profile-stats'>
            {user && (
                <div className="profile-stats-container">
                    <div className="profile-stats-profile-image" onClick={handleChangeProfile}>
                        <img src={user.photoURL} alt="profile" />
                    </div>
                    <div className="profile-stats-username">
                        <h3>{user.username}</h3>
                    </div>
                    <button className="profile-stats-edit-profile" onClick={() => handleEditProfile()}>Edit Profile</button>
                    <div className="profile-stats-post-followers-following">
                        <h4 className="profile-stats-post">0 Posts</h4>
                        <h4 className="profile-stats-followers">0 Followers</h4>
                        <h4 className="profile-stats-following">0 Following</h4>
                    </div>
                    <div className="profile-stats-other-info">
                        <h4 className="profile-stats-name">{user.firstName + ' ' + user.lastName}</h4>
                        <h6 className="profile-stats-bio">
                            {user.bio}
                        </h6>
                        <h6 className="profile-stats-link">
                            <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a>
                        </h6>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProfileStats;