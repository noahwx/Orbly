import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileStats = ({
    user,
}) => {

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/account/settings');
    }

    return ( 
        <div className='profile-stats'>
            {user && (
                <div className="profile-stats-container">
                    <div className="profile-stats-profile-image">
                        <img src={user.photoURL} alt="profile" />
                    </div>
                    <div className="profile-stats-username-container">
                        <h3 className="profile-stats-username">{user.username}</h3>
                        <button className="profile-stats-edit-profile" onClick={() => handleEditProfile()}>Edit Profile</button>
                    </div>
                    <div className="profile-stats-post-followers-following">
                        <h4 className="profile-stats-post">{user.posts} Posts</h4>
                        <h4 className="profile-stats-followers">0 Followers</h4>
                        <h4 className="profile-stats-following">0 Following</h4>
                        {/* <h4 className="profile-stats-followers">{user.followers.length} Followers</h4>
                        <h4 className="profile-stats-following">{user.following.length} Following</h4> */}
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