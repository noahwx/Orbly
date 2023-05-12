import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProfileStatsPub from "../components/public-components/ProfileStatsPub";
import ProfilePostPub from "../components/public-components/ProfilePostPub";
import Menu from "../components/Menu";
import "./styles/PublicProfile.css";

const PublicProfile = ({
    publicUser,
    posts,
    publicLink,
    toggleTheme,
    theme,
    handleCreatePost,
    createPost,
    CreatePostRef,
    setCreatePost,
    postModal,
    handlePostModal,
    postModalRef,
    selectedPost,
    setSelectedPost,
    handlePostLiked,
    auth,
    authUser,
}) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out');
            sessionStorage.clear();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        document.title = `${publicLink} | Orbly`;
    }, [publicLink]);

    return ( 
        <div className="public-profile">
            <ProfileStatsPub
                publicUser={publicUser}
                posts={posts}
            />
            <ProfilePostPub
                publicUser={publicUser}
                posts={posts}
                publicLink={publicLink}
                auth={auth}
            />
            {authUser ?
                <Menu 
                    toggleTheme={toggleTheme}
                    theme={theme}
                    handleCreatePost={handleCreatePost}
                    createPost={createPost}
                    CreatePostRef={CreatePostRef}
                    setCreatePost={setCreatePost}
                    postModal={postModal}
                    handlePostModal={handlePostModal}
                    postModalRef={postModalRef}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    handlePostLiked={handlePostLiked}
                    auth={auth}
                    authUser={authUser}
                    handleSignOut={handleSignOut}
                />
                :
                null
            }
            {authUser ? 
                null
                :
                <div className="public-profile-signup-signin-bar">
                    <h3 className="public-profile-signup-signin-bar-text">
                        <a href="/signup" className="public-profile-signup-signin-bar-link">
                            Sign up
                        </a>
                        &nbsp;or&nbsp;
                        <a href="/" className="public-profile-signup-signin-bar-link">
                            sign in
                        </a>
                        &nbsp;to see more
                    </h3>
                </div>
            }
        </div>
    );
}
 
export default PublicProfile;