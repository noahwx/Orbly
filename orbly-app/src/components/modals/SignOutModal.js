import React from "react";
import "./styles/SignOutModal.css";

const SignOutModal = ({
    handleSignOut,
    signOutModalRef,
    signOutModal,
}) => {
    return ( 
        <>
            {signOutModal &&
                <div className="sign-out-modal-container">
                    <div className="sign-out-modal" ref={signOutModalRef}>
                        <h2 className="sign-out-modal-title">You have been signed out.</h2>
                        {/* <button className="sign-out-modal-button" onClick={handleSignOut}>Please sign back in.</button> */}
                    </div>
                </div>
            }
        </>
    );
}
 
export default SignOutModal;