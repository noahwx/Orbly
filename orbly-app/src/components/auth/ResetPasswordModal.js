import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import PasswordVisibilityDark from "../../Assets/PasswordVisibilityDark.svg";
import PasswordVisibilityLight from "../../Assets/PasswordVisibilityLight.svg";
import PasswordVisibilityHiddenDark from "../../Assets/PasswordVisibilityHiddenDark.svg";
import PasswordVisibilityHiddenLight from "../../Assets/PasswordVisibilityHiddenLight.svg";
import "./styles/ResetPasswordModal.css";

const ResetPasswordModal = ({
    openChangePasswordModal,
    openChangePasswordModalRef,
    handleOpenChangePasswordModal,
    authUser,
    theme,
}) => {

    const auth = getAuth();

    const user = auth.currentUser;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmNewPassword) {
            updatePassword(user, newPassword).then(() => {
                console.log('password updated');
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                handleOpenChangePasswordModal();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log('passwords do not match');
        }
    }

    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false);
    const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
    const [confirmNewPasswordVisibility, setConfirmNewPasswordVisibility] = useState(false);

    const handleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisibility(!currentPasswordVisibility);
    }

    const handleNewPasswordVisibility = () => {
        setNewPasswordVisibility(!newPasswordVisibility);
    }

    const handleConfirmNewPasswordVisibility = () => {
        setConfirmNewPasswordVisibility(!confirmNewPasswordVisibility);
    }

    return ( 
        <>
            {openChangePasswordModal && (
                <div className='reset-password-background'>
                    <div className='reset-password-modal' ref={openChangePasswordModalRef}>
                        <div className='reset-password-modal-header'>
                            <h3>Change Password</h3>
                        </div>
                        <form className='reset-password-form' onSubmit={handleSubmit}>
                            <label className="reset-password-form-label" htmlFor='current-password'>Current Password</label>
                            {theme === 'light' ? (
                                <button className="reset-current-password-form-password-visibility-button" type='button' onClick={handleCurrentPasswordVisibility}>
                                    <img className="reset-current-password-form-password-visibility-icon" src={currentPasswordVisibility ? PasswordVisibilityDark : PasswordVisibilityHiddenDark} alt="password visibility icon" />
                                </button>
                            ) : (
                                <button className="reset-current-password-form-password-visibility-button" type='button' onClick={handleCurrentPasswordVisibility}>
                                    <img className="reset-current-password-form-password-visibility-icon" src={currentPasswordVisibility ? PasswordVisibilityLight : PasswordVisibilityHiddenLight} alt="password visibility icon" />
                                </button>
                            )}
                            <input className="reset-password-form-input" type={currentPasswordVisibility ? "text" : "password"} name='current-password' id='current-password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            <label className="reset-password-form-label" htmlFor='new-password'>New Password</label>
                            {theme === 'light' ? (
                                <button className="reset-new-password-form-password-visibility-button" type='button' onClick={handleNewPasswordVisibility}>
                                    <img className="reset-new-password-form-password-visibility-icon" src={newPasswordVisibility ? PasswordVisibilityDark : PasswordVisibilityHiddenDark} alt="password visibility icon" />
                                </button>
                            ) : (
                                <button className="reset-new-password-form-password-visibility-button" type='button' onClick={handleNewPasswordVisibility}>
                                    <img className="reset-new-password-form-password-visibility-icon" src={newPasswordVisibility ? PasswordVisibilityLight : PasswordVisibilityHiddenLight} alt="password visibility icon" />
                                </button>
                            )}
                            <input className="reset-password-form-input" type={newPasswordVisibility ? "text" : "password"} name='new-password' id='new-password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <label className="reset-password-form-label" htmlFor='confirm-new-password'>Confirm New Password</label>
                            {theme === 'light' ? (
                                <button className="reset-confirm-new-password-form-password-visibility-button" type='button' onClick={handleConfirmNewPasswordVisibility}>
                                    <img className="reset-confirm-new-password-form-password-visibility-icon" src={confirmNewPasswordVisibility ? PasswordVisibilityDark : PasswordVisibilityHiddenDark} alt="password visibility icon" />
                                </button>
                            ) : (
                                <button className="reset-confirm-new-password-form-password-visibility-button" type='button' onClick={handleConfirmNewPasswordVisibility}>
                                    <img className="reset-confirm-new-password-form-password-visibility-icon" src={confirmNewPasswordVisibility ? PasswordVisibilityLight : PasswordVisibilityHiddenLight} alt="password visibility icon" />
                                </button>
                            )}
                            <input className="reset-password-form-input" type={confirmNewPasswordVisibility ? "text" : "password"} name='confirm-new-password' id='confirm-new-password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            <div className="reset-password-form-button-container">
                                <button className="reset-password-form-button-submit" type='submit'>Change Password</button>
                                <div className="reset-password-form-button-divider"></div>
                                <button className="reset-password-form-button-cancel" onClick={handleOpenChangePasswordModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default ResetPasswordModal;