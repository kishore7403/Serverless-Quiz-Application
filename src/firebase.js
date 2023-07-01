// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD
import { getFirestore } from "firebase/firestore";
=======
import { getFirestore } from "firebase/firestore"; 
>>>>>>> 2ae4fb7 (game lobby basic structure)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5mXgxHvcYspa_hGwkfKOMUp8-OcVAY4s",
  authDomain: "serverless-sdp19.firebaseapp.com",
  projectId: "serverless-sdp19",
  storageBucket: "serverless-sdp19.appspot.com",
  messagingSenderId: "39828032763",
  appId: "1:39828032763:web:d1d0590d224d4e2792f45e",
  measurementId: "G-C0Z5N6FPLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Initialize Firestore instance
<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> 2ae4fb7 (game lobby basic structure)
