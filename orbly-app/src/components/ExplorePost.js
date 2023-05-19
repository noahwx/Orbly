import React, { useState, useEffect, useRef } from "react";
import PostModal from "./modals/PostModal";

const ExplorePost = ({
    posts,
    theme,
    handlePostLiked,
    authUser,
}) => {

    const [selectedPost, setSelectedPost] = useState(null);
    const [openPostModal, setOpenPostModal] = useState(false);
    const openPostModalRef = useRef(null);

    const handleOpenPostModal = () => {
        setOpenPostModal(!openPostModal);
    };

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(openPostModalRef.current && openPostModal && !openPostModalRef.current.contains(e.target)){
                setOpenPostModal(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [openPostModal, openPostModalRef]);

    /// filter((post) => post.userVerified === false)

    return ( 
        <div className="explore-post-area">
            {posts.sort((a, b) => b.postDate - a.postDate).map((post) => (
                <div className="explore-post" key={post.postID} onClick={() => {handleOpenPostModal(); setSelectedPost(post)}}>
                    <div className="explore-post-overlay">
                        <div className="explore-post-overlay-content">
                            <p className="explore-post-overlay-content-title">{post.postUsername}</p>
                            <p className="explore-post-overlay-content-text">{post.postLikes.length} Likes</p>
                            <p className="explore-post-overlay-content-text">{post.postComments.length} Comments</p>
                        </div>
                    </div>
                    <img src={post.postImage} alt="post" />
                </div>
            ))}
            {openPostModal && 
                <PostModal 
                    openPostModal={openPostModal}
                    openPostModalRef={openPostModalRef}
                    handleOpenPostModal={handleOpenPostModal}
                    selectedPost={selectedPost}
                    theme={theme}
                    handlePostLiked={handlePostLiked}
                    setOpenPostModal={setOpenPostModal}
                    authUser={authUser}
                />
            }
        </div>
    );
}
 
export default ExplorePost;