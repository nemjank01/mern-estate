/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ba1b2.firebaseapp.com",
  projectId: "mern-estate-ba1b2",
  storageBucket: "mern-estate-ba1b2.firebasestorage.app",
  messagingSenderId: "94806993705",
  appId: "1:94806993705:web:08fcbcdabd50441d94e538",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
