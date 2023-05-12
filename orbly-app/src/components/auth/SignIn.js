import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/logo.svg';
import './styles/SignIn.css';

const SignIn = () => {

    const navigation = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);
            window.sessionStorage.setItem('user', JSON.stringify(user.uid));
            window.sessionStorage.setItem('username', JSON.stringify(user.displayName));
            navigation('/home');
        }) 
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            navigation('/');
            if (errorCode === 'auth/wrong-password') {
                document.getElementById('password').classList.add('error');
            } else if (errorCode === 'auth/user-not-found') {
                document.getElementById('form-container').style.border = '2px solid var(--error)';
            } else if (errorCode === 'auth/invalid-email') {
                document.getElementById('email').classList.add('error');
            } else if (errorCode === 'auth/too-many-requests') {
                document.getElementById('form-container').style.border = '2px solid var(--error)';
            } else if (errorCode === 'auth/user-disabled') {
                document.getElementById('form-container').style.border = '2px solid var(--error)';
            } else if (errorCode === 'auth/weak-password') {
                document.getElementById('password').classList.add('error');
            } else if (errorCode === 'auth/email-already-in-use') {
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('form-container').style.border = '2px solid var(--error)';
            }
        });
    }

    return ( 
        <div className='signin'>
            <div className="signin-logo">
                <img src={logo} alt="orbly-logo" className="signin-logo-1"/>
                <img src={logo} alt="orbly-logo" className="signin-logo-2"/>
            </div>
            <div className='form-container' id="form-container">
                <form onSubmit={signIn} className='signin-form' id="signin-form">
                    <h5 className="signin-title">Log Into Your Account</h5>
                    <div className="signin-form-content">
                        <label className="signin-label-email">Email</label>
                        <input className="signin-input-email" type='email' id='email' placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className="signin-label-password">Password</label>
                        <input className="signin-input-password" type='password' id='password' placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
                <div className="signin-extras">
                    <p className="signin-no-account">Don't have an account? <a href='/signup'>Sign Up</a></p>
                    <p className="signin-forgot-password"><a href='/resetpassword'>Forgot Password?</a></p>
                </div>
            </div>
        </div>
    );
}
 
export default SignIn;