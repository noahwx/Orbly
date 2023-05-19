import React from "react";
import "./styles/FollowingModal.css";

const FollowingModal = ({
    user,
    authUser,
    handleShowFollowing,
    showFollowingRef,
    showFollowing,
}) => {
    return ( 
        <>
            {showFollowing && user && (
                <div className='followers-modal-container'>
                    <div className='followers-modal' ref={showFollowingRef}>
                        <div className='followers-modal-header'>
                            <h2 className='followers-modal-title'>Following</h2>
                        </div>
                        <div className="followers-modal-items">
                            {user?.followers?.map((follower) => (
                                <div className="followers-modal-item">
                                    <div className="followers-modal-item-left">
                                        <img src={follower?.avatar} alt="" className="followers-modal-item-image"/>
                                        <div className="followers-modal-item-info">
                                            <h3 className="followers-modal-item-username">{follower?.username}</h3>
                                        </div>
                                    </div>
                                    <div className="followers-modal-item-right">
                                        <button className="followers-modal-item-follow-button">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default FollowingModal;