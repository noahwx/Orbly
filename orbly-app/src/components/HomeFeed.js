import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, updateDoc, arrayRemove} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import PostMenuDark from "../Assets/PostMenuDark.svg";
import PostMenuLight from "../Assets/PostMenuLight.svg";
import CommentDark from "../Assets/commentDark.svg";
import CommentLight from "../Assets/commentLight.svg";
import FavoriteDark from "../Assets/FavoriteDark.svg";
import FavoriteLight from "../Assets/FavoriteLight.svg";
import ShareDark from "../Assets/ShareDark.svg";
import ShareLight from "../Assets/ShareLight.svg";
import BookmarkDark from "../Assets/BookmarkDark.svg";
import BookmarkLight from "../Assets/BookmarkLight.svg";
import PostSettingsModal from "./modals/PostSettingsModal";
import VerifiedCheck from "../Assets/VerifiedCheck.svg";
import ReportModal from "./modals/ReportModal";
import HomeFeedModal from "./modals/HomeFeedModal";
// import './styles/HomeFeed.css';
import './styles/HomeFeedNew.css';

const HomeFeed = ({
    posts,
    theme,
    handlePostLiked,
    auth,
    authUser,
    handlePostUnliked,
}) => {

    const navigate = useNavigate();

    const [selectedPost, setSelectedPost] = useState(null);
    const [postMenu, setPostMenu] = useState(false);
    const postMenuRef = useRef(null);

    const handlePostMenu = () => {
        setPostMenu(!postMenu);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(postMenuRef.current && postMenu && !postMenuRef.current.contains(e.target)){
                setPostMenu(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [postMenu, postMenuRef]);

    useEffect(() => {

        const handleOutsideClick = (e) => {
          if(postMenuRef.current && postMenu && !postMenuRef.current.contains(e.target)){
            setPostMenu(false)
          }
        }
    
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [postMenu]);

    const [reportMenu, setReportMenu] = useState(false);
    const reportMenuRef = useRef(null);

    const handleReportMenu = () => {
        setReportMenu(!reportMenu);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(reportMenuRef.current && reportMenu && !reportMenuRef.current.contains(e.target)){
                setReportMenu(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [reportMenu, reportMenuRef]);

    const [comment, setComment] = useState('');

    const handleComment = (post, e) => {
        e.preventDefault();
        const postRef = doc(db, 'posts', post.postID);
        updateDoc(postRef, {
            postComments: arrayUnion({
                commentUser: window.sessionStorage.getItem('username').replace(/['"]+/g, ''),
                commentUserImage: authUser.photoURL,
                commentContent: comment,
                commentDate: new Date(),
            }),
        });

        const userRef = doc(db, 'users', post.postAuthor);
        updateDoc(userRef, {
            notifications: arrayUnion({
                notificationID: uuidv4(),
                notificationType: 'comment',
                notificationAuthor: authUser.displayName,
                notificationAuthorAvatar: authUser.photoURL,
                notificationPostID: post.postID,
                notificationPostImage: post.postImage,
                notificationPostAuthor: post.postAuthor,
                notificationPostUsername: post.postUsername,
                notificationPostAuthorAvatar: post.postUserImage,
                notificationDate: new Date(),
                notificationContent: comment,
            }),
        });
    }

    const handleCommentDelete = (post, comment) => {
        const postRef = doc(db, 'posts', post.postID);
        updateDoc(postRef, {
            postComments: arrayRemove(comment),
        });
    }

    const [commentCount, setCommentCount] = useState(0);

    const [homeFeedModal, setHomeFeedModal] = useState(false);
    const homeFeedModalRef = useRef(null);

    const handleHomeFeedModal = () => {
        setHomeFeedModal(!homeFeedModal);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(homeFeedModalRef.current && homeFeedModal && !homeFeedModalRef.current.contains(e.target)){
                setHomeFeedModal(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [homeFeedModal, homeFeedModalRef]);

    return ( 
        <div className="homefeed">
            {posts.sort((a, b) => b.postDate - a.postDate).map((post) => (
                <div key={post.postID} className="post">
                    <div className="post-header">
                        <div className="post-header-left">
                            <img src={post.postUserImage} alt="User" className="post-user-image" onClick={() => navigate(`/${post.postUsername}`)}/>
                            <h3 className="post-username" onClick={() => navigate(`/${post.postUsername}`)}>{post.postUsername}</h3>
                            {post.userVerified === true ? (
                                <img src={VerifiedCheck} alt="Verified" className="post-verified-check" />
                            ) : (
                                <></>
                            )}
                            <span className="post-glyph">•</span>
                            <p className="post-date">
                                {post.postDate.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                            </p>
                        </div>
                        <div className="post-header-right">
                           {theme === 'light' ? (
                                <button className="post-menu-btn" onClick={() => {handlePostMenu(); setSelectedPost(post);}}>
                                    <img src={PostMenuDark} alt="Post Menu" />
                                </button>
                            ) : (
                                <button className="post-menu-btn" onClick={() => {handlePostMenu(); setSelectedPost(post);}}>
                                    <img src={PostMenuLight} alt="Post Menu" />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="post-image-container">
                        <div className="post-image">
                            <img src={post.postImage} alt="Post" className="user-posted-image"/>
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="post-content-left-top">
                            {theme === 'light' ? post.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? (
                                <img src={FavoriteDark} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostUnliked(post)}
                                    style={{
                                        filter: 'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)',
                                    }}
                                />
                            ) : (
                                <img src={FavoriteDark} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostLiked(post)}
                                    style={{
                                        filter: 'invert(0)',
                                    }}
                                />
                            ) : post.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? (
                                <img src={FavoriteLight} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostUnliked(post)}
                                    style={{
                                        filter: 'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)',
                                    }}
                                />
                            ) : (
                                <img src={FavoriteLight} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostLiked(post)}
                                    style={{
                                        filter: 'invert(0)',
                                    }}
                                />
                            )}
                            {theme === 'light' ? (
                                <img src={CommentDark} alt="Comment" className="post-content-left-top-icon" onClick={() => {handleHomeFeedModal(); setSelectedPost(post);}}/>
                            ) : (
                                <img src={CommentLight} alt="Comment" className="post-content-left-top-icon" onClick={() => {handleHomeFeedModal(); setSelectedPost(post);}}/>
                            )}
                            {theme === 'light' ? (
                                <img src={ShareDark} alt="Share" className="post-content-left-top-icon" />
                            ) : (
                                <img src={ShareLight} alt="Share" className="post-content-left-top-icon" />
                            )}
                            {theme === 'light' ? (
                                <img src={BookmarkDark} alt="Bookmark" className="post-content-right-top-icon" />
                            ) : (
                                <img src={BookmarkLight} alt="Bookmark" className="post-content-right-top-icon" />
                            )}
                        </div>
                        <h3 className="post-likes">{post.postLikes.length} likes</h3>
                        <div className="post-content-left-bottom">
                            <p className="post-text">
                                <strong onClick={() => navigate(`/${post.postUsername}`)}>{post.postUsername}</strong>
                                &nbsp;
                                {post.postText}
                            </p>
                            <div className="post-comments">
                                {post.postComments.length > 2 ? (
                                    <h3 className="post-comments-header" onClick={() => {handleHomeFeedModal(); setSelectedPost(post);}}>View all {post.postComments.length} Comments</h3>
                                ) : (
                                    null
                                )}
                                {post.postComments.sort((a, b) => b.postDate - a.postDate).slice(-2).map((comment, index) => (
                                    <div key={index} className="post-comment">
                                        <h3 className="post-comment-username" onClick={() => navigate(`/${comment.commentUser}`)}>{comment.commentUser}</h3>
                                        <p className="post-comment-text">
                                            {comment.commentContent}
                                        </p>
                                        {authUser?.displayName === comment.commentUser && (
                                            <button className="post-comment-delete-btn" onClick={() => handleCommentDelete(post, comment)}>Delete</button>
                                        )}
                                    </div>
                                ))}
                                <form className="post-comment-input" onSubmit={(e) => handleComment(post, e)}>
                                    <input type="text" placeholder="Add a comment..." className="post-comment-input-text" maxLength={50} value={comment} onChange={(e) => {setComment(e.target.value); setCommentCount(e.target.value.length);}}/>
                                    <button className="post-comment-input-btn" type="submit" onClick={(e) => handleComment(post, e)}>Post</button>
                                    {commentCount > 25 ? (
                                        <p className="post-comment-input-characters"
                                            style={{
                                                color: commentCount < 40 ? 'var(--text-secondary)' : 'var(--error)',
                                                animation: commentCount === 25 ? 'none' : 'fadeIn forwards 0.5s' ? commentCount === 50 ? 'shake forwards 0.5s' : 'none': 'fadeIn forwards 0.5s',
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
            ))}
            {postMenu && 
                <PostSettingsModal 
                    postMenu={postMenu}
                    postMenuRef={postMenuRef}
                    selectedPost={selectedPost}
                    authUser={authUser}
                    auth={auth}
                    handleReportMenu={handleReportMenu}
                    handlePostMenu={handlePostMenu}
                    setPostMenu={setPostMenu}
                />
            }
            {reportMenu &&
                <ReportModal 
                    reportMenu={reportMenu}
                    reportMenuRef={reportMenuRef}
                    selectedPost={selectedPost}
                    authUser={authUser}
                    auth={auth}
                    handleReportMenu={handleReportMenu}
                    setPostMenu={setPostMenu}
                />
            }
            {homeFeedModal &&
                <HomeFeedModal
                    homeFeedModal={homeFeedModal}
                    homeFeedModalRef={homeFeedModalRef}
                    handleHomeFeedModal={handleHomeFeedModal}
                    setHomeFeedModal={setHomeFeedModal}
                    selectedPost={selectedPost}
                    authUser={authUser}
                    auth={auth}
                    theme={theme}
                    handlePostLiked={handlePostLiked}
                />
            }
        </div>
    );
}
 
export default HomeFeed;