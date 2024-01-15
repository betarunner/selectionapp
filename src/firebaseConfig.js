// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG0W5R3E0GTKjP7ae1CzaTLBgLrb5irJ0",
  authDomain: "selectionapp-d5a74.firebaseapp.com",
  projectId: "selectionapp-d5a74",
  storageBucket: "selectionapp-d5a74.appspot.com",
  messagingSenderId: "43794481040",
  appId: "1:43794481040:web:0bb5c22d4b5282b0ec7d15",
  measurementId: "G-YN6GQ5Y7RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize other Firebase services
const db = getFirestore(app);

export { app, db };