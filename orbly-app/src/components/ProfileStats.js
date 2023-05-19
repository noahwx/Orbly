import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerifiedCheck from "../Assets/VerifiedCheck.svg";
import ChangeProfileModal from "./modals/ChangeProfileModal";
import FollowersModal from "./modals/FollowersModal";
import FollowingModal from "./modals/FollowingModal";

const ProfileStats = ({
    user,
    authUser,
}) => {

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate(`/${authUser?.displayName}/settings`);
    }

    const [changeProfile, setChangeProfile] = React.useState(false);
    const changeProfileRef = React.useRef(changeProfile);

    const handleChangeProfile = () => {
        setChangeProfile(!changeProfile);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(changeProfileRef.current && changeProfile && !changeProfileRef.current.contains(e.target)){
                setChangeProfile(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [changeProfile]);

    const [showFollowers, setShowFollowers] = React.useState(false);
    const showFollowersRef = React.useRef(showFollowers);

    const handleShowFollowers = () => {
        setShowFollowers(!showFollowers);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(showFollowersRef.current && showFollowers && !showFollowersRef.current.contains(e.target)){
                setShowFollowers(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [showFollowers]);

    const [showFollowing, setShowFollowing] = React.useState(false);
    const showFollowingRef = React.useRef(showFollowing);

    const handleShowFollowing = () => {
        setShowFollowing(!showFollowing);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(showFollowingRef.current && showFollowing && !showFollowingRef.current.contains(e.target)){
                setShowFollowing(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [showFollowing]);

    return ( 
        <div className='profile-stats'>
            {user && (
                <div className="profile-stats-container">
                    <div className="profile-stats-profile-image">
                        <img src={user.photoURL} alt="profile" onClick={() => handleChangeProfile()}/>
                    </div>
                    <div className="profile-stats-username-container">
                        <h3 className="profile-stats-username">{user.username} {user.userVerified && <img src={VerifiedCheck} alt="verified" className="profile-verified-check"/>}</h3>
                        <button className="profile-stats-edit-profile" onClick={() => handleEditProfile(authUser)}>Edit Profile</button>
                    </div>
                    <div className="profile-stats-post-followers-following">
                        <h4 className="profile-stats-post">{user.posts} Posts</h4>
                        {user.followers 
                            ? <h4 className="profile-stats-followers" onClick={() => handleShowFollowers(user)}>{user.followers.length} Followers</h4>
                            : <h4 className="profile-stats-followers">0 Followers</h4>
                        }
                        {user.following
                            ? <h4 className="profile-stats-following" onClick={() => handleShowFollowing(user)}>{user.following.length} Following</h4>
                            : <h4 className="profile-stats-following">0 Following</h4>
                        }
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
            {changeProfile && 
                <ChangeProfileModal 
                    user={user}
                    authUser={authUser}
                    handleChangeProfile={handleChangeProfile}
                    changeProfileRef={changeProfileRef}
                    changeProfile={changeProfile}
                />
            }
            {showFollowers &&
                <FollowersModal 
                    user={user}
                    authUser={authUser}
                    handleShowFollowers={handleShowFollowers}
                    showFollowersRef={showFollowersRef}
                    showFollowers={showFollowers}
                />
            }
            {showFollowing &&
                <FollowingModal 
                    user={user}
                    authUser={authUser}
                    handleShowFollowing={handleShowFollowing}
                    showFollowingRef={showFollowingRef}
                    showFollowing={showFollowing}
                />
            }
        </div>
    );
}
 
export default ProfileStats;