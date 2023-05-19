import React, { useState } from "react";
import "./styles/ChangeProfileModal.css";
import { updateDoc, doc, collection, query, writeBatch, where, getDocs } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../firebase";

const ChangeProfileModal = ({
    changeProfileRef,
    changeProfile,
    handleChangeProfile,
    user,
    authUser,
}) => {

    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');
    const [newPicture, setNewPicture] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            photoURL: newPicture ? newPicture : authUser?.photoURL,
        }).then(() => {
            console.log('user profile updated');
        }).catch((error) => {
            console.log(error);
        });
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
            photoURL: newPicture ? newPicture : authUser?.photoURL,
        }).then(() => {
            console.log('user data updated');
        }).catch((error) => {
            console.log(error);
        });
        const batch = writeBatch(db);
        const postRef = collection(db, "posts");
        const q = query(postRef, where("postAuthor", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, {
                postUserImage: newPicture ? newPicture : authUser?.photoURL,
            });
        });
        await batch.commit().then(() => {
            console.log('user posts updated');
            handleChangeProfile();
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <>
            {changeProfile && (
                <div className="change-profile-modal-container">
                    <div className="change-profile-modal" ref={changeProfileRef}>
                        <form className='change-profile-form' onSubmit={(e) => handleSubmit(e)}>
                            <div className="change-profile-form-group">
                                <label className="change-profile-form-label" htmlFor="newPicture">New Profile Picture</label>
                                <input
                                    type="text"
                                    name="newPicture"
                                    id="newPicture"
                                    className="change-profile-form-input"
                                    placeholder="Enter a URL"
                                    value={newPicture}
                                    onChange={(e) => setNewPicture(e.target.value)}
                                />
                                <button className="change-profile-form-button" type="submit">Change Profile Picture</button>
                                <button className="change-profile-form-button-cancel" onClick={() => handleChangeProfile()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default ChangeProfileModal;