import React, { useState, useEffect } from "react";
import ProfilePostModal from "./modals/ProfilePostModal";
import "./styles/ProfilePost.css";

const ProfilePosts = ({
    posts,
    user,
    handlePostLiked,
    theme,
    authUser,
}) => {

    const [selectedPost, setSelectedPost] = useState(null);
    const [openPost, setOpenPost] = useState(false);
    const openPostRef = React.useRef(openPost);

    const handleOpenPost = () => {
        setOpenPost(!openPost);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(openPostRef.current && openPost && !openPostRef.current.contains(e.target)){
                setOpenPost(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [openPost, openPostRef]);

    return ( 
        <div className="profile-post-container">
            {user.posts === 0 ? <h3 className='no-posts'>No posts yet</h3> : ''}
            <div className="profile-post">
                {posts.sort((a, b) => b.postDate - a.postDate).filter((post) => post.postUsername === sessionStorage.getItem("username").replace(/['"]+/g, '')).map((post) => (
                    <div className="user-post" key={post.postID} onClick={() => {handleOpenPost(); setSelectedPost(post)}}>
                        <div className="user-post-overlay">
                            <div className="user-post-overlay-text">
                                <h3 className="user-post-overlay-likes">
                                    {post.postLikes.length} likes
                                </h3>
                                <h3 className="user-post-overlay-comments">
                                    {post.postComments.length} comments
                                </h3>
                            </div>
                        </div>
                        <img src={post.postImage} alt={post.postText} className="user-post-image"/>
                    </div>
                ))}
            </div>
            {openPost ? 
                <ProfilePostModal 
                    selectedPost={selectedPost}
                    handlePostLiked={handlePostLiked}
                    openPostRef={openPostRef}
                    openPost={openPost}
                    handleOpenPost={handleOpenPost}
                    theme={theme}
                    authUser={authUser}
                />
            : null
            }
        </div>
    );
}
 
export default ProfilePosts;