import React from "react";
import { useNavigate } from "react-router-dom";
import SunLight from "../Assets/Sunlight.svg";
import SunDark from "../Assets/SunDark.svg";
import SettingLight from "../Assets/SettingLight.svg";
import SettingDark from "../Assets/SettingDark.svg";
import SignOutLight from "../Assets/Sign_Out_Light.svg";
import SignOutDark from "../Assets/Sign_Out_Dark.svg";
import BookmarkLight from "../Assets/BookmarkLight.svg";
import BookmarkDark from "../Assets/BookmarkDark.svg";
import BugDark from "../Assets/BugDark.svg";
import BugLight from "../Assets/BugLight.svg";

const MenuSettingsModal = ({
    isOpen,
    isOpenRef,
    handleSignOut,
    toggleTheme,
    theme,
}) => {

    const navigate = useNavigate();

    return ( 
        <div className="menu-settings-modal">
            {isOpen && (
                <div className="menu-settings-modal-content" ref={isOpenRef}>
                    <div className="menu-settings-modal-item" onClick={() => navigate('/account/settings')}>
                        {theme === 'light' ?
                            <div>
                                <img src={SettingDark} alt="dark mode" className="menu-settings-apperance-image"/>
                                Settings
                            </div>
                        :
                            <div>
                                <img src={SettingLight} alt="light mode" className="menu-settings-apperance-image"/>
                                Settings
                            </div>
                        }
                    </div>
                    <div className="menu-settings-modal-item">
                        {theme === 'light' ?
                            <div>
                                <img src={BookmarkDark} alt="dark mode" className="menu-settings-apperance-image"/>
                                Bookmark
                            </div>
                        :
                            <div>
                                <img src={BookmarkLight} alt="light mode" className="menu-settings-apperance-image"/>
                                Bookmark
                            </div>
                        }
                    </div>
                    <div className="menu-settings-modal-item apperance-area" onClick={toggleTheme}>
                        {theme === 'light' ? 
                            <div>
                                <img src={SunDark} alt="dark mode" className="menu-settings-apperance-image"/>
                                Change Apperance
                            </div>
                        :
                            <div>
                                <img src={SunLight} alt="light mode" className="menu-settings-apperance-image"/>
                                Change Apperance
                            </div>
                        }
                    </div>
                    <div className="menu-settings-modal-item">
                        {theme === 'light' ?
                            <div>
                                <img src={BugDark} alt="dark mode" className="menu-settings-apperance-image"/>
                                Report a Bug
                            </div>
                        :
                            <div>
                                <img src={BugLight} alt="light mode" className="menu-settings-apperance-image"/>
                                Report a Bug
                            </div>
                        }
                    </div>
                    <div className="menu-settings-modal-item" onClick={handleSignOut}>
                        {theme === 'light' ?
                            <div>
                                <img src={SignOutDark} alt="dark mode" className="menu-settings-apperance-image"/>
                                Sign Out
                            </div>
                        :
                            <div>
                                <img src={SignOutLight} alt="light mode" className="menu-settings-apperance-image"/>
                                Sign Out
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default MenuSettingsModal;