// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBue-fH0eet06DwQW_dfyQ3D_oQqOfcWgg",
  authDomain: "password-manager-67dda.firebaseapp.com",
  projectId: "password-manager-67dda",
  storageBucket: "password-manager-67dda.appspot.com",
  messagingSenderId: "624116468546",
  appId: "1:624116468546:web:53124acdfb9b0f90b116db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
