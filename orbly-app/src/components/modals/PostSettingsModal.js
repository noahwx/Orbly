import React from "react";
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./styles/PostSettingsModal.css";

const PostSettingsModal = ({
    postMenu,
    postMenuRef,
    selectedPost,
    authUser,
    handleReportMenu,
    handlePostMenu,
    setPostMenu,
}) => {

    const navigate = useNavigate();

    const handleDeletePost = (selectedPost) => {
        const postRef = doc(db, "posts", selectedPost.postID);
        deleteDoc(postRef).then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        
        const userRef = doc(db, "users", authUser.uid);
        updateDoc(userRef, {
            posts: increment(-1),
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    return ( 
        <>
            {postMenu && selectedPost && (
                <div className="post-settings-modal-background">
                    <div className={authUser.uid === selectedPost.postAuthor ? 'post-settings-modal' : 'post-settings-modal-null'} ref={postMenuRef}>
                        <div className="post-settings-modal-items">
                            <div className="post-settings-modal-item warning" onClick={() => {handleReportMenu(); setPostMenu(false)}}>
                                Report
                            </div>
                            {authUser && authUser.uid === selectedPost.postAuthor && (
                                <div className="post-settings-modal-item warning" onClick={() => handleDeletePost(selectedPost)}>
                                    Delete
                                </div>
                            )}
                            <div className="post-settings-modal-item">
                                Bookmark
                            </div>
                            <div className="post-settings-modal-item">
                                Go to post
                            </div>
                            <div className="post-settings-modal-item">
                                Share to...
                            </div>
                            <div className="post-settings-modal-item">
                                Copy link
                            </div>
                            <div className="post-settings-modal-item">
                                Embed
                            </div>
                            <div className="post-settings-modal-item" onClick={() => navigate(`/${selectedPost.postUsername}`)}>
                                Go to account
                            </div>
                            <div className="post-settings-modal-item-cancel" onClick={handlePostMenu}>
                                Cancel  
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostSettingsModal;