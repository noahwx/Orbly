import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import logo from '../../Assets/logo.svg';
import './styles/SignUp.css';

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            document.getElementById('password').style.border = '2px solid var(--error)';
            document.getElementById('confirm-password').style.border = '2px solid var(--error)';
            alert('Passwords do not match.');
            return;
        } else if (password.length < 8) {
            document.getElementById('password').style.border = '2px solid var(--error)';
            document.getElementById('confirm-password').style.border = '2px solid var(--error)';
            alert('Password must be at least 8 characters.');
            return;
        } else if (password.length > 20) {
            document.getElementById('password').style.border = '2px solid var(--error)';
            document.getElementById('confirm-password').style.border = '2px solid var(--error)';
            alert('Password must be less than 20 characters.');
            return;
        } else if (phoneNumber.length !== 12) {
            document.getElementById('phone-number').style.border = '2px solid var(--error)';
            alert('Phone number must be 10 digits.');
            return;
        } else if (phoneNumber.length === 12) {
            for (let i = 0; i < phoneNumber.length; i++) {
                if (isNaN(phoneNumber[i])) {
                    document.getElementById('phone-number').style.border = '2px solid var(--error)';
                    alert('Phone number must be 10 digits.');
                    return;
                }
            }
        }
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            updateProfile(auth.currentUser, {
                photoURL: 'https://i.ibb.co/mBz67t6/User-Default-Image.png',
            }).then(() => {
                console.log('profile updated');
                setDoc(doc(db, 'users', user.uid), {
                    email: email,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    phoneNumber: phoneNumber,
                    photoURL: 'https://i.ibb.co/mBz67t6/User-Default-Image.png',
                    bio: '',
                    website: '',
                    private: false,
                    followers: [],
                    following: [],
                    posts: 0,
                }).then(() => {
                    console.log('user added to database');
                }
                ).catch((error) => {
                    console.log(error);
                }
                );
            }).catch((error) => {
                console.log(error);
            }
            ).catch((error) => {
                console.log(error);
            });
            navigate('/');
        }) 
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/email-already-in-use') {
                document.getElementById('email').style.border = '2px solid var(--error)';
                alert('Email already in use.');
            } else if (errorCode === 'auth/invalid-email') {
                document.getElementById('email').style.border = '2px solid var(--error)';
                alert('Invalid email.');
            } else if (errorCode === 'auth/weak-password') {
                document.getElementById('password').style.border = '2px solid var(--error)';
                document.getElementById('confirm-password').style.border = '2px solid var(--error)';
                alert('Weak password.');
            } else {
                alert(errorMessage);
            }
        });
    }

    return ( 
        <div className='signup'>
            <div className="signup-logo">
                <img src={logo} alt="Orbly Logo"/>
            </div>
            <div className='signup-form-container' id="form-container">
                <form onSubmit={signUp} className='signup-form'>
                    <h5 className="signup-form-title">Create Your Account</h5>
                    <div className="signup-form-contents">
                        <label className="signup-form-label-email">Email</label>
                        <input className="signup-form-input-email" type='email' id='email' placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label className="signup-form-label-username">Username</label>
                        <input className="signup-form-input-username" type='text' id='username' placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <label className="signup-form-label-en">Enter Your Name</label>
                        <div className="signup-form-name-container">
                            <input className="signup-form-input-fn" type='text' id='first-name' placeholder="First name..." value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                            <input className="signup-form-input-ln" type='text' id='last-name' placeholder="Last name..." value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        </div>
                        <label className="signup-form-label-dob">Date of Birth</label>
                        <input className="signup-form-input-dob" type='date' id='date-of-birth' placeholder="Enter your date of birth..." value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
                        <label className="signup-form-label-pn">Phone Number</label>
                        <input className="signup-form-input-pn" type='tel' id='phone-number' placeholder="Enter your phone number..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required maxLength={12}/>
                        <div className="signup-form-password-container">
                            <label className="signup-form-label-password">Password</label>
                            <input className="signup-form-input-password" type='password' id='password' placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <label className="signup-form-label-confirm-password">Confirm Password</label>
                            <input className="signup-form-input-confrim-password" type='password' id='confirm-password' placeholder="Enter your password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>    
                        </div>
                        <div className="signup-terms-container">
                            <input className="signup-terms-checkbox" type="checkbox" id="terms" name="terms" value="terms" required/>
                            <label className="signup-terms-label" htmlFor="terms">I agree to the <a href="/ToS">Terms of Service</a> and <a href="/PP">Privacy Policy</a></label>
                        </div>
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <div className="signup-form-bottom">
                        <p className="signup-form-bottom-text">Already have an account? <a href="/">Sign In</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default SignUp;