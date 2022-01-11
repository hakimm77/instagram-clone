import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
    localStorage.setItem("USER", result.user.uid);
  });
};

export default login;
