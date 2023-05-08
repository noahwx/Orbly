// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYMWj1QZZ0JLfcI0XTH2tdry8OxAEKh20",
  authDomain: "orbly2023.firebaseapp.com",
  projectId: "orbly2023",
  storageBucket: "orbly2023.appspot.com",
  messagingSenderId: "56191473607",
  appId: "1:56191473607:web:2c00434e466def7e47ebe2",
  measurementId: "G-KLRMDYBVEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);