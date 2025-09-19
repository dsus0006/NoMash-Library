// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0F44tXIec4pu-xlpt-PLHUsjYEPGR75o",
  authDomain: "week7-dsusanto.firebaseapp.com",
  projectId: "week7-dsusanto",
  storageBucket: "week7-dsusanto.firebasestorage.app",
  messagingSenderId: "162324637205",
  appId: "1:162324637205:web:99148aa6fcf0e7acf0d01c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()

export const auth = getAuth(app)
export default db
