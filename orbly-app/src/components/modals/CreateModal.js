import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import './styles/CreateModal.css';

const CreateModal = ({
    openCreateRef,
    openCreate,
    handleOpenCreate,
    authUser,
    auth,
}) => {

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
        }
        
        const postRef = doc(db, 'posts', id);
        setDoc(postRef, post);

        const userRef = doc(db, 'users', authUser?.uid);
        updateDoc(userRef, {
            posts: increment(1),
        });

        handleOpenCreate();
    }

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
                            <textarea className="create-modal-textarea" type="text" placeholder="Post text" value={postText} onChange={(e) => setPostText(e.target.value)}/>
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