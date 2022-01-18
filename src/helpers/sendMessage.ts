import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const sendMessage = (
  message: string,
  userId: string,
  picture: string | undefined
) => {
  addDoc(collection(db, "/chat"), {
    message: message,
    userId: userId,
    picture: picture,
    timestamp: serverTimestamp(),
  });
};

export default sendMessage;
