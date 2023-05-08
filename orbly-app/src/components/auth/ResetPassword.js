import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logo from '../../Assets/logo.svg';
import './styles/ResetPassword.css';

const ResetPassword = () => {

    const [email, setEmail] = useState('');

    const auth = getAuth();

    const resetPassword = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/invalid-email') {
                document.getElementById('email').style.border = '2px solid var(--error)';
                alert('Invalid email.');
            } else if (errorCode === 'auth/user-not-found') {
                document.getElementById('email').style.border = '2px solid var(--error)';
                alert('User not found.');
            } else {
                console.log(errorCode, errorMessage);
            }
        });
    }

    return ( 
        <div className="resetpassword">
            <div className="resetpassword-logo">
                <img src={logo} alt="orbly-logo" />
            </div>
            <div className="resetpassword-form-container">
                <h1 className="resetpassword-form-title">Reset Password</h1>
                <form className="resetpassword-form" onSubmit={resetPassword}>
                    <label className="resetpassword-label-email">Email</label>
                    <input className="resetpassword-input-email" type="email" id="email" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className="resetpassword-button-submit" type="submit">Reset Password</button>
                </form>
                <div className="resetpassword-bottom">
                    <p className="resetpassword-bottom-text">Don't have an account? <a className="resetpassword-bottom-link" href="/signup">Sign Up</a></p>
                    <p className="resetpassword-bottom-text">Already have an account? <a className="resetpassword-bottom-link" href="/">Sign In</a></p>
                </div>
            </div>
        </div>
    );
}
 
export default ResetPassword;