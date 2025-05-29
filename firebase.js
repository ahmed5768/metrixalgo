// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlB0t42_FfRbDu_5_14dD7OLyU0Sb_uRg",
  authDomain: "login-auth-4c6ec.firebaseapp.com",
  projectId: "login-auth-4c6ec",
  storageBucket: "login-auth-4c6ec.firebasestorage.app",
  messagingSenderId: "350884464854",
  appId: "1:350884464854:web:ad824b5646cf171897e177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app)