import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import ReportModal from "./modals/ReportModal";
import './styles/HomeFeed.css';

const HomeFeed = ({
    posts,
    theme,
    handlePostLiked,
    auth,
    authUser,
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

    return ( 
        <div className="homefeed">
            {posts.sort((a, b) => b.postDate - a.postDate).map((post) => (
                <div key={post.postID} className="post">
                    <div className="post-header">
                        <div className="post-header-left">
                            <img src={post.postUserImage} alt="User" className="post-user-image" onClick={() => {navigate(`/${post.postUsername}`); window.location.reload(true);}}/>
                            <h3 className="post-username" onClick={() => {navigate(`/${post.postUsername}`); window.location.reload(true);}}>{post.postUsername}</h3>
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
                    <div className="post-image">
                        <img src={post.postImage} alt="Post" className="user-posted-image"/>
                    </div>
                    <div className="post-content">
                        <div className="post-content-left-top">
                            {theme === 'light' ? (
                                <img src={FavoriteDark} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostLiked(post)} 
                                    style={{
                                        filter: post.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? 
                                            'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                        : 
                                            'invert(0)',
                                    }}
                                />
                            ) : (
                                <img src={FavoriteLight} alt="Favorite" className="post-content-left-top-icon" onClick={() => handlePostLiked(post)} 
                                    style={{
                                        filter: post.postLikes.includes(window.sessionStorage.getItem('username').replace(/['"]+/g, '')) ? 
                                            'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                        : 
                                            'invert(0)',
                                    }}
                                />
                            )}
                            {theme === 'light' ? (
                                <img src={CommentDark} alt="Comment" className="post-content-left-top-icon" />
                            ) : (
                                <img src={CommentLight} alt="Comment" className="post-content-left-top-icon" />
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
                                <strong onClick={() => {navigate(`/${post.postUsername}`); window.location.reload(true)}}>{post.postUsername}</strong>
                                &nbsp;
                                {post.postText}
                            </p>
                            <div className="post-comments">
                                {post.postComments.length > 0 ? (
                                    <h3 className="post-comments-header">View all {post.postComments.length} Comments</h3>
                                ) : (
                                    <h3 className="post-comments-header">No Comments</h3>
                                )}
                                {post.postComments.map((comment) => (
                                    <div key={comment.id} className="post-comment">
                                        <h3 className="post-comment-username">{comment.commentUsername}</h3>
                                        <p className="post-comment-text">{comment.commentText}</p>
                                    </div>
                                ))}
                                <div className="post-comment-input">
                                    <input type="text" placeholder="Add a comment..." className="post-comment-input-text" />
                                    <button className="post-comment-input-btn">Post</button>
                                </div>
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
        </div>
    );
}
 
export default HomeFeed;