import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface messageType {
  message: string;
  picture: string;
  userId: string;
}

const getMessages = async () => {
  let arr: Array<messageType> = [];

  await onSnapshot(
    query(collection(db, "chat"), orderBy("timestamp", "asc")),
    (messages) => {
      messages.forEach(async (res) => {
        const messages = await res.data();
        arr.push(messages as messageType);
      });
    }
  );

  return arr;
};
export default getMessages;
