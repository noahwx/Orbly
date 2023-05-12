import React from "react";
import "./styles/ProfilePostPub.css";

const ProfilePostPub = ({
    posts,
    publicLink,
    auth,
}) => {

    const postCount = posts.filter((post) => post.postUsername === publicLink).length;

    return ( 
        <div className={auth ? 'public-profile-post-container' : 'public-profile-post-container-null'}>
            {postCount === 0 ? <h3 className='public-no-posts'>No posts yet</h3> : ''}
            <div className="public-profile-post">
                {posts.sort((a, b) => b.postDate - a.postDate).filter((post) => post.postUsername === publicLink).map((post) => (
                    <div className="public-user-post" key={post.postID}>
                        <div className="public-post-overlay">
                            <div className="public-post-overlay-text">
                                <h3 className="public-post-overlay-likes">
                                    {post.postLikes.length} likes
                                </h3>
                                <h3 className="public-post-overlay-comments">
                                    {post.postComments.length} comments
                                </h3>
                            </div>
                        </div>
                        <img src={post.postImage} alt={post.postText} className="public-user-post-image"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default ProfilePostPub;