import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import { updateProfile, getAuth } from "firebase/auth";
import EmailVerified from "../Assets/EmailVerified.svg";

const ProfileSettingsForm = ({
    authUser,
    handleOpenChangePasswordModal,
}) => {

    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');

    const [currentUsername, setCurrentUsername] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentBio, setCurrentBio] = useState('');
    const [currentWebsite, setCurrentWebsite] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [privateAccount, setPrivateAccount] = useState(false);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc.id === uid) {
                    setCurrentUsername(doc.data().username);
                    setCurrentEmail(doc.data().email);
                    setCurrentBio(doc.data().bio);
                    setCurrentWebsite(doc.data().website);
                    setEmailVerified(doc.data().emailVerified);
                    setPrivateAccount(doc.data().private);
                } else {
                    console.log('No such document!');
                }
            });
        }
        fetchUserData();
    }, [uid]);

    const [username, setUsername] = useState(currentUsername);
    const [email, setEmail] = useState(currentEmail);
    const [bio, setBio] = useState(currentBio);
    const [website, setWebsite] = useState(currentWebsite);
    const [privateAcc, setPrivateAcc] = useState(privateAccount);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: username ? username : authUser?.displayName,
            photoURL: authUser?.photoURL ? authUser?.photoURL : null,
        }).then(() => {
            console.log('user profile updated');
        }).catch((error) => {
            console.log(error);
        });
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
            username: username ? username : authUser?.displayName,
            email: email ? email : authUser?.email,
            bio: bio ? bio : currentBio,
            website: website ? website : currentWebsite,
            private: privateAcc,
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
                postUsername: username ? username : authUser?.displayName,
            });
        });
        await batch.commit().then(() => {
            console.log('user posts updated');
        }).catch((error) => {
            console.log(error);
        });
    }

    const handlePrivateAcc = (e) => {
        if (e.target.value === 'true') {
            setPrivateAcc(true);
        } else {
            setPrivateAcc(false);
        }
    }

    return ( 
        <div>
            <form className='profile-settings-form' onSubmit={(e) => handleSubmit(e)}>
                <div className="profile-settings-profile-picture">
                    <img src={authUser?.photoURL} alt="profile" />
                </div>
                <label className="profile-settings-label" htmlFor='username'>Username</label>
                <input className="profile-settings-input" type='text' name='username' id='username' placeholder={currentUsername} value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => setUsername(currentUsername)} />
                <label htmlFor="bio" className="profile-settings-label">Bio</label>
                <textarea className="profile-settings-input" name="bio" id="bio" maxLength={150} placeholder={currentBio} value={bio} onChange={(e) => setBio(e.target.value)} onBlur={() => setCurrentBio(currentBio)} />
                <label htmlFor="website" className="profile-settings-label">Website</label>
                <input className="profile-settings-input" type="text" name="website" id="website" placeholder={currentWebsite} value={website} onChange={(e) => setWebsite(e.target.value)} onBlur={() => setCurrentWebsite(currentWebsite)} />
                <label className="profile-settings-label" htmlFor='email'>Email</label>
                {emailVerified ? <img src={EmailVerified} alt="email verified" className="email-verified" /> : null}
                <input className="profile-settings-input" type='email' name='email' id='email' placeholder={currentEmail} value={email}  onChange={(e) => setEmail(e.target.value)} onBlur={() => setCurrentEmail(currentEmail)}  />
                <div className="profile-settings-private-account">
                    <label htmlFor="private-account" className="profile-settings-label">Private Account
                        <select className="private-account-select" onChange={(e) => handlePrivateAcc(e)} defaultValue={privateAccount} >
                            <option value={privateAccount}>{privateAccount ? 'Private' : 'Public'}</option>
                            <option value={!privateAccount}>{privateAccount ? 'Public' : 'Private'}</option>
                        </select>
                    </label>
                </div>
                <div className="profile-settings-buttons">
                    <button className="profile-settings-button" type='button' onClick={() => handleOpenChangePasswordModal(authUser)}>Change Password</button>
                    <button className="profile-settings-button" type='submit'>Update</button>
                </div>
            </form>
        </div>
    );
}
 
export default ProfileSettingsForm;