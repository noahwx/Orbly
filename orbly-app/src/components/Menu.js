import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeDark from "../Assets/HomeDark.svg";
import HomeLight from "../Assets/HomeLight.svg";
import CompassDark from "../Assets/CompassDark.svg";
import CompassLight from "../Assets/CompassLight.svg";
import MessageDark from "../Assets/MessageDark.svg";
import MessageLight from "../Assets/MessageLight.svg";
import NotificationDark from "../Assets/NotificationsDark.svg";
import NotificationLight from "../Assets/NotificationsLight.svg";
import CreateDark from "../Assets/CreateDark.svg";
import CreateLight from "../Assets/CreateLight.svg";
import MenuDark from "../Assets/MenuDark.svg";
import MenuLight from "../Assets/MenuLight.svg";
import MenuModal from "./modals/MenuModal";
import CreateModal from "./modals/CreateModal";
import './styles/Menu.css';

const Menu = ({
    handleSignOut,
    toggleTheme,
    theme,
    authUser,
    auth,
    notifications,
}) => {

    const [openMenu, setOpenMenu] = useState(false);
    const openMenuRef = useRef(null);

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(openMenuRef.current && openMenu && !openMenuRef.current.contains(e.target)){
                setOpenMenu(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [openMenuRef, openMenu]);

    const [openCreate, setOpenCreate] = useState(false);
    const openCreateRef = useRef(null);

    const handleOpenCreate = () => {
        setOpenCreate(!openCreate);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(openCreateRef.current && openCreate && !openCreateRef.current.contains(e.target)){
                setOpenCreate(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [openCreateRef, openCreate]);
    
    return ( 
        <div className="menu">
            <NavLink to="/home" className='menu-title'>
                <h1>Orbly</h1>
            </NavLink>
            <div className="menu-items">
                <NavLink to="/home" className='menu-item'>
                    {theme === 'light' ?
                        <div>
                            <img src={HomeDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            Home
                        </div>
                    :
                        <div>
                            <img src={HomeLight} alt="light mode" className="menu-settings-apperance-image"/>
                            Home
                        </div>
                    }
                </NavLink>
                <NavLink to="/explore" className='menu-item'>
                    {theme === 'light' ?
                        <div>
                            <img src={CompassDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            Explore
                        </div>
                    :
                        <div>
                            <img src={CompassLight} alt="light mode" className="menu-settings-apperance-image"/>
                            Explore
                        </div>
                    }
                </NavLink>
                <NavLink to="/messages" className='menu-item'>
                    {theme === 'light' ?
                        <div>
                            <img src={MessageDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            Messages
                        </div>
                    :
                        <div>
                            <img src={MessageLight} alt="light mode" className="menu-settings-apperance-image"/>
                            Messages
                        </div>
                    }
                </NavLink>
                <NavLink to="/notifications" className='menu-item'>
                    {theme === 'light' ?
                        <div>
                            <img src={NotificationDark} alt="dark mode" className="menu-settings-apperance-image" 
                                style={{
                                    filter: notifications.length > 0 ? 
                                        'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                    : 
                                        'invert(0)',
                                }}
                            />
                            Notifications {notifications.length > 0 ? `(${notifications.length})` : ''}
                        </div>
                    :
                        <div>
                            <img src={NotificationLight} alt="light mode" className="menu-settings-apperance-image"
                                style={{
                                    filter: notifications.length > 0 ? 
                                        'invert(36%) sepia(48%) saturate(2074%) hue-rotate(323deg) brightness(87%) contrast(96%)' 
                                    : 
                                        'invert(0)',
                                    animation: notifications.length > 0 ? 'pulse 5s infinite' : 'none',
                                }}
                            />
                            Notifications {notifications.length > 0 ? `(${notifications.length})` : ''}
                        </div>
                    }
                </NavLink>
                <div className='menu-item create-button' onClick={() => handleOpenCreate()}>
                    {theme === 'light' ?
                        <div>
                            <img src={CreateDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            Create
                        </div>
                    :
                        <div>
                            <img src={CreateLight} alt="light mode" className="menu-settings-apperance-image"/>
                            Create
                        </div>
                    }
                </div>
                <NavLink to={`/${authUser?.displayName}`} className='menu-item'>
                    <div>
                        <img src={auth.currentUser?.photoURL} alt="profile" 
                            style={{
                                position: 'relative',
                                top: '5px',
                                left: '-2px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginRight: '20px',
                                border: '1px solid var(--border)',
                            }}
                        />
                        <span className="menu-profile-text">Profile</span>
                    </div>
                </NavLink>
            </div>
            <div className="menu-settings">
                <button className='menu-item-settings' onClick={() => handleOpenMenu()}>
                    {theme === 'light' ?
                        <div>
                            <img src={MenuDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            More
                        </div>
                    :
                        <div>
                            <img src={MenuLight} alt="light mode" className="menu-settings-apperance-image"/>
                            More
                        </div>
                    }
                </button>
            </div>
            {openMenu ?
                <MenuModal 
                    openMenuRef={openMenuRef}
                    handleOpenMenu={handleOpenMenu}
                    openMenu={openMenu}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    handleSignOut={handleSignOut}
                    authUser={authUser}
                />
            :
                null
            }
            {openCreate ?
                <CreateModal 
                    openCreateRef={openCreateRef}
                    handleOpenCreate={handleOpenCreate}
                    openCreate={openCreate}
                    authUser={authUser}
                    auth={auth}
                />
            :
                null
            }
        </div>
    );
}
 
export default Menu;