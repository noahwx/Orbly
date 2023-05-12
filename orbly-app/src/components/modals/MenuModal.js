import React, { useState, useEffect, useRef } from "react";
import SettingDark from "../../Assets/SettingDark.svg";
import SettingLight from "../../Assets/SettingLight.svg";
import BookmarkDark from "../../Assets/BookmarkDark.svg";
import BookmarkLight from "../../Assets/BookmarkLight.svg";
import SunDark from "../../Assets/SunDark.svg";
import SunLight from "../../Assets/Sunlight.svg";
import BugDark from "../../Assets/BugDark.svg";
import BugLight from "../../Assets/BugLight.svg";
import SignOutDark from "../../Assets/Sign_Out_Dark.svg";
import SignOutLight from "../../Assets/Sign_Out_Light.svg";
import { useNavigate } from "react-router-dom";
import './styles/MenuModal.css';
import SignOutModal from "./SignOutModal";

const MenuModal = ({
    openMenuRef,
    openMenu,
    theme,
    toggleTheme,
    handleSignOut,
    authUser,
}) => {

    const navigate = useNavigate();

    const [signOutModal, setSignOutModal] = useState(false);
    const signOutModalRef = useRef(null);

    const handleSignOutModal = () => {
        setSignOutModal(!signOutModal);
    }

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(signOutModalRef.current && signOutModal && !signOutModalRef.current.contains(e.target)){
                setSignOutModal(false)
                window.location.reload(true);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [signOutModalRef, signOutModal]);

    return ( 
        <>
            {openMenu &&
                <div className="menu-modal-container">
                    <div className="menu-modal" ref={openMenuRef}>
                        <div className="menu-modal-items">
                            <div className="menu-modal-item">
                                {theme === 'light' ?
                                    <div className="menu-modal-item-area" onClick={() => navigate(`/${authUser?.displayName}/settings`)}>
                                        <img src={SettingDark} alt="dark mode" className="menu-settings-apperance-image-item" />
                                        <span>Settings</span>
                                    </div>
                                :
                                    <div className="menu-modal-item-area" onClick={() => navigate(`/${authUser?.displayName}/settings`)}>
                                        <img src={SettingLight} alt="light mode" className="menu-settings-apperance-image-item" />
                                        <span>Settings</span>
                                    </div>  
                                }
                            </div>
                            <div className="menu-modal-item">
                                {theme === 'light' ?
                                    <div className="menu-modal-item-area">
                                        <img src={BookmarkDark} alt="dark mode" className="menu-settings-apperance-image-item"/>
                                        <span>Bookmarks</span>
                                    </div>
                                :
                                    <div className="menu-modal-item-area">
                                        <img src={BookmarkLight} alt="light mode" className="menu-settings-apperance-image-item"/>
                                        <span>Bookmarks</span>
                                    </div>  
                                }
                            </div>
                            <div className="menu-modal-item">
                                {theme === 'light' ?
                                    <div className="menu-modal-item-area" onClick={toggleTheme}>
                                        <img src={SunDark} alt="dark mode" className="menu-settings-apperance-image-item"/>
                                        <span>Switch Apperance</span>
                                    </div>
                                :
                                    <div className="menu-modal-item-area" onClick={toggleTheme}>
                                        <img src={SunLight} alt="light mode" className="menu-settings-apperance-image-item"/>
                                        <span>Switch Apperance</span>
                                    </div>  
                                }
                            </div>
                            <div className="menu-modal-item">
                                {theme === 'light' ?
                                    <div className="menu-modal-item-area">
                                        <img src={BugDark} alt="dark mode" className="menu-settings-apperance-image-item"/>
                                        <span>Report A Bug</span>
                                    </div>
                                :
                                    <div className="menu-modal-item-area">
                                        <img src={BugLight} alt="light mode" className="menu-settings-apperance-image-item"/>
                                        <span>Report A Bug</span>
                                    </div>  
                                }
                            </div>
                            <div className="menu-modal-item">
                                {theme === 'light' ?
                                    <div className="menu-modal-item-area" onClick={() => {handleSignOut(); handleSignOutModal()}}>
                                        <img src={SignOutDark} alt="dark mode" className="menu-settings-apperance-image-item"/>
                                        <span>Sign Out</span>
                                    </div>
                                :
                                    <div className="menu-modal-item-area" onClick={() => {handleSignOut(); handleSignOutModal()}}>
                                        <img src={SignOutLight} alt="light mode" className="menu-settings-apperance-image-item"/>
                                        <span>Sign Out</span>
                                    </div>  
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {signOutModal ?
                <SignOutModal 
                    signOutModal={signOutModal}
                    signOutModalRef={signOutModalRef}
                    handleSignOutModal={handleSignOutModal}
                />
            :
                null
            }
        </>
    );
}
 
export default MenuModal;