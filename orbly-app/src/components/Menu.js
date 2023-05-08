import React from "react";
import { NavLink } from "react-router-dom";
import MenuSettingsModal from "./MenuSettingsModal";
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
import './styles/Menu.css';

const Menu = ({
    handleSignOut,
    toggleTheme,
    theme,
    authUser,
}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const isOpenRef = React.useRef(isOpen);

    const handleMenuSettings = () => {
        setIsOpen(!isOpen);
    }

    const handleOutsideClick = (e) => {
        (isOpenRef.current && !e.target.closest('.menu')) && setIsOpen(false);
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, []);

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
                            <img src={NotificationDark} alt="dark mode" className="menu-settings-apperance-image"/>
                            Notifications
                        </div>
                    :
                        <div>
                            <img src={NotificationLight} alt="light mode" className="menu-settings-apperance-image"/>
                            Notifications
                        </div>
                    }
                </NavLink>
                <div className='menu-item create-button'>
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
                <NavLink to="/profile" className='menu-item'>
                    <div>
                        <img src={authUser?.photoURL} alt="profile" 
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
                <button className='menu-item-settings' onClick={() => handleMenuSettings()}>
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
            <MenuSettingsModal 
                isOpen={isOpen}
                isOpenRef={isOpenRef}
                handleSignOut={handleSignOut}
                toggleTheme={toggleTheme}
                theme={theme}
            />
        </div>
    );
}
 
export default Menu;