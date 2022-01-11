import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIb7-l_iqpe6rZPV0XN5KGwLUsSPdEUVQ",
  authDomain: "instagram-clone-8f59f.firebaseapp.com",
  projectId: "instagram-clone-8f59f",
  storageBucket: "instagram-clone-8f59f.appspot.com",
  messagingSenderId: "236603356685",
  appId: "1:236603356685:web:c7f38fc4eac41a905d0744",
  measurementId: "G-4XKKF7T9C9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
