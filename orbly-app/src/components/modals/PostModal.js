import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import PostMenuDark from "../../Assets/PostMenuDark.svg";
import PostMenuLight from "../../Assets/PostMenuLight.svg";
import FavoriteDark from "../../Assets/FavoriteDark.svg";
import FavoriteLight from "../../Assets/FavoriteLight.svg";
import CommentDark from "../../Assets/commentDark.svg";
import CommentLight from "../../Assets/commentLight.svg";
import ShareDark from "../../Assets/ShareDark.svg";
import ShareLight from "../../Assets/ShareLight.svg";
import BookmarkDark from "../../Assets/BookmarkDark.svg";
import BookmarkLight from "../../Assets/BookmarkLight.svg";
import "./styles/PostModal.css";

const PostModal = ({
    openPostModal,
    openPostModalRef,
    selectedPost,
    theme,
    setOpenPostModal,
}) => {

    const navigate = useNavigate();

    const handlePostLiked = (selectedPost) => {
        const postRef = doc(db, 'posts', selectedPost.postID);
        updateDoc(postRef, {
            postLikes: arrayUnion(window.sessionStorage.getItem('username').replace(/['"]+/g, '')),
        });
    }

    return ( 
        <>
            {openPostModal && selectedPost &&
                <div className="post-modal-background">
                    <div className="post-modal-container" ref={openPostModalRef}>
                        <div className="post-modal-image-container">
                            <img src={selectedPost.postImage} alt="post" className="post-modal-image" />
                        </div>
                        <div className="post-modal-content">
                            <div className="post-modal-content-header">
                                <img src={selectedPost.postUserImage} alt="profile" className="post-modal-content-header-profile-image" onClick={() => {navigate(`/${selectedPost.postUsername}`); window.location.reload(true);}} />
                                <p className="post-modal-content-header-username" onClick={() => {navigate(`/${selectedPost.postUsername}`); window.location.reload(true);}}>{selectedPost.postUsername}</p>
                                {theme === 'light' ? 
                                    <img src={PostMenuDark} alt="menu" className="post-modal-content-header-menu" /> 
                                : 
                                    <img src={PostMenuLight} alt="menu" className="post-modal-content-header-menu" /> 
                                }
                            </div>
                            <div className="post-modal-content-body">
                                <p className="post-modal-content-body-text">
                                    <strong className="username-strong" onClick={() => {navigate(`/${selectedPost.postUsername}`); window.location.reload(true);}}>{selectedPost.postUsername}</strong> {selectedPost.postText}
                                </p>
                                <div className="post-modal-content-body-comments">

                                </div>
                                <div className="post-modal-content-body-action-info">
                                    <div className="post-modal-content-body-action-bar">
                                        <div className="post-modal-content-body-action-bar-left">
                                            {theme === 'light' ?
                                                <img src={FavoriteDark} alt="like" className="post-modal-content-body-action-bar-icon" onClick={() => handlePostLiked(selectedPost)} 
                                                    style={{
                                                        filter: selectedPost.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? 
                                                            'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                                        : 
                                                            'invert(0)',
                                                    }}
                                                />
                                            :
                                                <img src={FavoriteLight} alt="like" className="post-modal-content-body-action-bar-icon" onClick={() => handlePostLiked(selectedPost)} 
                                                    style={{
                                                        filter: selectedPost.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? 
                                                            'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                                        : 
                                                            'invert(0)',
                                                    }}
                                                />
                                            }
                                            {theme === 'light' ?
                                                <img src={CommentDark} alt="comment" className="post-modal-content-body-action-bar-icon" />
                                            :
                                                <img src={CommentLight} alt="comment" className="post-modal-content-body-action-bar-icon" />
                                            }
                                            {theme === 'light' ?
                                                <img src={ShareDark} alt="share" className="post-modal-content-body-action-bar-icon" />
                                            :
                                                <img src={ShareLight} alt="share" className="post-modal-content-body-action-bar-icon" />
                                            }
                                        </div>
                                        <div className="post-modal-content-body-action-bar-right">
                                            {theme === 'light' ?
                                                <img src={BookmarkDark} alt="bookmark" className="post-modal-content-body-action-bar-icon" />
                                            :
                                                <img src={BookmarkLight} alt="bookmark" className="post-modal-content-body-action-bar-icon" />
                                            }
                                        </div>
                                    </div>
                                    <div className="post-modal-content-body-action-post-info">
                                        <p className="post-modal-content-body-action-post-info-likes">{selectedPost.postLikes.length} likes</p>
                                        <p className="post-modal-content-body-action-post-info-date">{selectedPost.postDate.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</p>
                                    </div>
                                    <div className="post-modal-content-body-action-post-comment">
                                        <input type="text" placeholder="Add a comment..." className="post-modal-content-body-action-post-comment-input" />
                                        <button className="post-modal-content-body-action-post-comment-button">Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default PostModal;