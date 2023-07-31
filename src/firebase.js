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
<<<<<<< HEAD
  apiKey: "AIzaSyC5mXgxHvcYspa_hGwkfKOMUp8-OcVAY4s",
  authDomain: "serverless-sdp19.firebaseapp.com",
  projectId: "serverless-sdp19",
  storageBucket: "serverless-sdp19.appspot.com",
  messagingSenderId: "39828032763",
  appId: "1:39828032763:web:d1d0590d224d4e2792f45e",
  measurementId: "G-C0Z5N6FPLS",
};
=======
    apiKey: "AIzaSyD3lilxUO2ElGEpJzTYni-bqdXTdMXgUF8",
    authDomain: "csci5410-b00934899.firebaseapp.com",
    projectId: "csci5410-b00934899",
    storageBucket: "csci5410-b00934899.appspot.com",
    messagingSenderId: "706876347349",
    appId: "1:706876347349:web:ec495a2afc8e562a30635c"
  };
  
>>>>>>> 77efb80 (firestore collections implemented, filtering working)

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
