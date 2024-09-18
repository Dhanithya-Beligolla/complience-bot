// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlaomTUkOPotuiTWnmFtBi_W9nVS2qNA8",
  authDomain: "login-auth-6e38b.firebaseapp.com",
  projectId: "login-auth-6e38b",
  storageBucket: "login-auth-6e38b.appspot.com",
  messagingSenderId: "987151220056",
  appId: "1:987151220056:web:5b49a1cc3b95288752392d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

export default app;