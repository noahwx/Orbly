import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import './styles/CreateModal.css';

const CreateModal = ({
    openCreateRef,
    openCreate,
    handleOpenCreate,
    authUser,
    auth,
}) => {

    const [isVerified, setIsVerified] = useState(false);

    const userUID = sessionStorage.getItem('user').replace(/"/g, '');
    console.log(userUID);
    
    useEffect(() => {
        const checkVerified = async () => {
            const userRef = doc(db, 'users', userUID);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setIsVerified(docSnap.data().userVerified);
            } else {
                console.log('No such document!');
            }
        }
        checkVerified();
    }, [userUID]);

    console.log(isVerified);

    const [imageLink, setImageLink] = useState('');
    const [postText, setPostText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuidv4();
        const date = new Date();
        const post = {
            postID: id,
            date: date,
            postImage: imageLink,
            postText: postText,
            postLikes: [],
            postComments: [],
            postAuthor: authUser?.uid,
            postDate: date,
            postUsername: authUser?.displayName,
            postUserImage: authUser?.photoURL,
            userVerified: isVerified,
        }
        
        const postRef = doc(db, 'posts', id);
        setDoc(postRef, post);

        const userRef = doc(db, 'users', authUser?.uid);
        updateDoc(userRef, {
            posts: increment(1),
        });

        handleOpenCreate();
    }

    const [postTextCount, setPostTextCount] = useState(0);

    return ( 
        <>
            {openCreate &&
                <div className="create-modal-container">
                    <div className="create-modal" ref={openCreateRef}>
                        <button className="create-modal-close" onClick={handleOpenCreate}>x</button>
                        <h1 className="create-modal-title">Create new post</h1>
                        <form className="create-modal-form" onSubmit={handleSubmit}>
                            <label className="create-modal-label">Image link:</label>
                            <input className="create-modal-input" type="text" placeholder="Image link" value={imageLink} onChange={(e) => setImageLink(e.target.value)}/>
                            <label className="create-modal-label">Post text:</label>
                            <p className="create-modal-text-count"
                                style={{
                                    color: postTextCount < 150 ? 'var(--text)' : 'var(--error)',
                                    animation: postTextCount < 150 ? 'none' : 'shake 0.5s ease-in-out 0s 1 normal forwards',
                                }}
                            >{postTextCount}/150</p>
                            <textarea className="create-modal-textarea" type="text" placeholder="Post text" maxLength={150} value={postText} onChange={(e) => {setPostText(e.target.value); setPostTextCount(e.target.value.length)}}/>
                            <button type="submit" className="create-modal-button-create">Create</button>
                            <button className="create-modal-button-cancel" onClick={handleOpenCreate}>Cancel</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}
 
export default CreateModal;