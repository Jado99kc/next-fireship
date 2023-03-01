// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUDZziiXtajCLtuNK0Y1libuMq7MuS-xw",
  authDomain: "nextfire-8e41d.firebaseapp.com",
  projectId: "nextfire-8e41d",
  storageBucket: "nextfire-8e41d.appspot.com",
  messagingSenderId: "471873872003",
  appId: "1:471873872003:web:8511f739e273cf5a497bb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
