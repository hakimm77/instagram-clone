import { auth, db } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider).then(async (result) => {
    console.log(result);
    const userExists = await getDoc(doc(db, `users/${result.user.uid}`));

    if (userExists.exists()) {
      await localStorage.setItem("USER", result.user.uid);
      window.location.href = "/home";
    } else {
      await alert("This account doesn't exist");
      window.location.href = "/signup";
    }
  });
};

export default login;
