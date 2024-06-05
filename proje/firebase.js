import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırmanızı buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyDcZb58gNpJnKcgUQOQtKyHKUeBzyjtTyY",
  authDomain: "trendforma-b498d.firebaseapp.com",
  projectId: "trendforma-b498d",
  storageBucket: "trendforma-b498d.appspot.com",
  messagingSenderId: "876062044455",
  appId: "1:876062044455:web:b6d03e9303f72118e03902",
  measurementId: "G-N1GKTTWJEM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
