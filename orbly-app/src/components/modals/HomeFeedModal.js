import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";
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
import "./styles/HomeFeedModal.css";

const HomeFeedModal = ({
    homeFeedModal,
    homeFeedModalRef,
    handleHomeFeedModal,
    setHomeFeedModal,
    selectedPost,
    auth,
    authUser,
    theme,
    handlePostLiked,
}) => {

    const navigate = useNavigate();

    const [comment, setComment] = useState('');
    // const [currentComments, setCurrentComments] = useState([]);

    const handleComment = (selectedPost, e) => {
        e.preventDefault();
        const postRef = doc(db, 'posts', selectedPost.postID);
        updateDoc(postRef, {
            postComments: arrayUnion({
                commentUser: window.sessionStorage.getItem('username').replace(/['"]+/g, ''),
                commentUserImage: authUser.photoURL,
                commentContent: comment,
                commentDate: new Date(),
            }),
        });
    }

    const handleCommentDelete = (selectedPost, comment, e) => {
        e.preventDefault();
        const postRef = doc(db, 'posts', selectedPost.postID);
        updateDoc(postRef, {
            postComments: arrayRemove(comment),
        });
    }

    const [commentCount, setCommentCount] = useState(0);

    const inputRef = React.useRef(null);
    const handleCommentFocus = () => {
        inputRef.current.focus();
    }

    return ( 
        <>
            {homeFeedModal && selectedPost && 
                <div className="post-modal-background">
                    <div className="post-modal-container" ref={homeFeedModalRef}>
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
                                    {selectedPost.postComments.sort((a, b) => b.commentDate - a.commentDate).map((comment, index) => (
                                        <div className="post-modal-content-body-comment" key={index}>
                                            <strong className="post-modal-username-strong" onClick={() => {navigate(`/${comment.commentUser}`); window.location.reload(true);}}>{comment.commentUser}</strong>
                                            <p className="post-modal-content-body-comment-text">
                                                {comment.commentContent.length > 30 ? comment.commentContent.substring(0, 30) + '...' : comment.commentContent}
                                            </p>
                                            {authUser?.displayName === comment.commentUser && (
                                                <button className="post-modal-comment-delete-btn" onClick={(e) => handleCommentDelete(selectedPost, comment, e)}>Delete</button>
                                            )}
                                        </div>
                                    ))}
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
                                                <img src={CommentDark} alt="comment" className="post-modal-content-body-action-bar-icon" onClick={() => handleCommentFocus()}/>
                                            :
                                                <img src={CommentLight} alt="comment" className="post-modal-content-body-action-bar-icon" onClick={() => handleCommentFocus()}/>
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
                                    <form className="post-modal-content-body-action-post-comment" onSubmit={(e) => handleComment(selectedPost, e)}>
                                        <input type="text" placeholder="Add a comment..." className="post-modal-content-body-action-post-comment-input" maxLength={50} value={comment} onChange={(e) => {setComment(e.target.value); setCommentCount(e.target.value.length);}} ref={inputRef}/>
                                        <button className="post-modal-content-body-action-post-comment-button" type="submit" onClick={(e) => handleComment(selectedPost, e)}>Post</button>
                                        {commentCount > 25 ? (
                                            <p className="post-modal-comment-input-characters"
                                                style={{
                                                    color: commentCount < 40 ? 'var(--text-secondary)' : 'var(--error)',
                                                    animation: commentCount === 25 ? 'none' : 'fadeIn forwards 0.5s' ? commentCount === 50 ? 'shake forwards 0.5s' : 'none': 'none',
                                                }}
                                            >{commentCount}/50</p>
                                        ) : (
                                            null
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default HomeFeedModal;