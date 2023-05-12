import React from "react";
import "./styles/ProfileStatsPub.css";

const ProfileStatsPub = ({
    publicUser,
    posts,
}) => {
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
                        </div>
                        <div className="public-profile-stats-container-header-stats-posts">
                            <h4 className="public-profile-stats-container-header-post-length">{user.posts} Posts</h4>
                            <h4 className="public-profile-stats-container-header-followers-length">{user.followers.length} Followers</h4>
                            <h4 className="public-profile-stats-container-header-following-length">{user.following.length} Following</h4>
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