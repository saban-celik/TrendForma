// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAxdfq4si4q9Dzr_m0hEu8cqSO6J8jgsvg",
  authDomain: "merhaba-b5176.firebaseapp.com",
  projectId: "merhaba-b5176",
  storageBucket: "merhaba-b5176.appspot.com",
  messagingSenderId: "727088447385",
  appId: "1:727088447385:web:b2b1f402b967fcc985dd08",
  measurementId: "G-90QBP3RKKZ"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;


