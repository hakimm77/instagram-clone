import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const signup = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
    setDoc(doc(db, `users`, result.user.uid), {
      name: result.user.displayName,
      email: result.user.email,
      profilePic: result.user.photoURL,
      id: result.user.uid,
    });

    localStorage.setItem("USER", result.user.uid);
  });
};

export default signup;
