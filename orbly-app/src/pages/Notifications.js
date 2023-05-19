import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import NotificationsDark from "../Assets/NotificationsDark.svg";
import NotificationsLight from "../Assets/NotificationsLight.svg";
import Menu from "../components/Menu";
import "./styles/Notifications.css";

const Notifications = ({
    toggleTheme,
    theme,
    handleCreatePost,
    notifications,
}) => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            console.log('user is signed out');
        }
    });

    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('user signed out');
            sessionStorage.clear();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleReadNotification = (notification) => {
        const userRef = doc(db, 'users', authUser.uid);
        updateDoc(userRef, {
            notifications: arrayRemove(notification),
        });
    };

    useEffect(() => {
        document.title = `Notifications - Orbly ${notifications.length > 0 ? `(${notifications.length})` : ''}`;
    }, [notifications]);

    return ( 
        <div className='notifications'>
            <Menu 
                auth={auth}
                authUser={authUser}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
                handleCreatePost={handleCreatePost}
                notifications={notifications}
            />
            <div className="notifications-container">
                <div className="notifications-header">
                    {theme === 'light' ?
                        <img src={NotificationsDark} alt="Notifications" className="notifications-icon" />
                    :
                        <img src={NotificationsLight} alt="Notifications" className="notifications-icon" />
                    }
                    <h1 className="notifications-title">
                        Notifications
                    </h1>
                </div>
                <div className="notifications-area">
                    {notifications.length > 0 ? 
                        notifications.sort((a, b) => b.notificationDate - a.notificationDate).map((notification, index) => (
                            <div className="notification" key={index}>
                                <div className="notification-header">
                                    <img src={notification.notificationAuthorAvatar} alt="Profile" className="notification-profile-picture" />
                                    <div className="notification-user">
                                        <h3 className="notification-text">
                                            {notification.notificationType === 'like' ? `${notification.notificationPostUsername} liked your post` : `${notification.notificationPostUsername} commented your post`}
                                            <small className="notification-date">
                                                {notification.notificationDate.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                            </small>
                                        </h3>
                                    </div>
                                </div>
                                <div className="notification-post">
                                    <img src={notification.notificationPostImage} alt="Post" className="notification-post-image" />
                                </div>
                                <button className="notification-read-button" onClick={() => handleReadNotification(notification)}>
                                    Mark as read
                                </button>
                            </div>
                        ))
                    :
                        <div className="no-notifications">
                            <h1 className="no-notifications-title">
                                No notifications yet
                            </h1>
                            <h2 className="no-notifications-text">
                                When someone likes or comments on one of your posts, you'll see it here.
                            </h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Notifications;