import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuFvN0Mmp2MAVSnE0uGsQzWKJllCZ0_O4",
  authDomain: "react-native-hw-539b2.firebaseapp.com",
  projectId: "react-native-hw-539b2",
  storageBucket: "react-native-hw-539b2.appspot.com",
  messagingSenderId: "779273011599",
  appId: "1:779273011599:web:25940d7370f28337674bfa",
  measurementId: "G-0ESQTY4NNH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
