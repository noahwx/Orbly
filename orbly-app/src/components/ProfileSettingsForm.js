import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProfile, getAuth } from "firebase/auth";

const ProfileSettingsForm = ({
    authUser,
}) => {

    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');

    const [currentUsername, setCurrentUsername] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentBio, setCurrentBio] = useState('');
    const [currentWebsite, setCurrentWebsite] = useState('');
    
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
        }).then(() => {
            console.log('user data updated');
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <div>
            <form className='profile-settings-form' onSubmit={(e) => handleSubmit(e)}>
                <div className="profile-settings-profile-picture">
                    <img src={authUser?.photoURL} alt="profile" />
                </div>
                <label className="profile-settings-label" htmlFor='username'>Username</label>
                <input className="profile-settings-input" type='text' name='username' id='username' placeholder={currentUsername} value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => setUsername(username)} />
                <label htmlFor="bio" className="profile-settings-label">Bio</label>
                <textarea className="profile-settings-input" name="bio" id="bio" maxLength={150} placeholder={currentBio} value={bio} onChange={(e) => setBio(e.target.value)} onBlur={() => setCurrentBio(currentBio)} />
                <label htmlFor="website" className="profile-settings-label">Website</label>
                <input className="profile-settings-input" type="text" name="website" id="website" placeholder={currentWebsite} value={website} onChange={(e) => setWebsite(e.target.value)} onBlur={() => setCurrentWebsite(website)} />
                <label className="profile-settings-label" htmlFor='email'>Email</label>
                <input className="profile-settings-input" type='email' name='email' id='email' placeholder={currentEmail} value={email}  onChange={(e) => setEmail(e.target.value)} onBlur={() => setCurrentEmail(email)}  />
                <button className="profile-settings-button" type='submit'>Update</button>
            </form>
        </div>
    );
}
 
export default ProfileSettingsForm;