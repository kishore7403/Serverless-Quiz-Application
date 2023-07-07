// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3lilxUO2ElGEpJzTYni-bqdXTdMXgUF8",
    authDomain: "csci5410-b00934899.firebaseapp.com",
    projectId: "csci5410-b00934899",
    storageBucket: "csci5410-b00934899.appspot.com",
    messagingSenderId: "706876347349",
    appId: "1:706876347349:web:ec495a2afc8e562a30635c"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Initialize Firestore instance
export default app;