import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProfile } from "firebase/auth";

const ChangeProfilePicModal = ({
    auth,
    changeProfile,
    setChangeProfile,
    changeProfileRef,
}) => {

    const [profilePic, setProfilePic] = React.useState('');
    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');

    const handleChangePic = async (e) => {
        e.preventDefault();
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            photoURL: profilePic,
        });
        await updateProfile(auth.currentUser, {
            photoURL: profilePic,
        });
    }

    return ( 
        <div>
            {changeProfile && (
                <div className='change-profile-pic-modal'>
                    <div className="change-profile-pic-modal-content" ref={changeProfileRef}>
                        <div className="change-profile-pic-modal-close" onClick={() => setChangeProfile(false)}>
                            X
                        </div>
                        <h1 className="change-profile-pic-modal-title">Change Profile Picture</h1>
                        <form onSubmit={handleChangePic} className="change-profile-pic-modal-form">
                            <input className="change-profile-pic-modal-input" type="text" placeholder="Enter new profile picture link..." value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                            <button type="submit" className="change-profile-pic-modal-button">Change</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ChangeProfilePicModal;