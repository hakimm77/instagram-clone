import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { MessageType } from "../types";

const getMessages = async () => {
  let arr: Array<MessageType> = [];

  await onSnapshot(
    query(collection(db, "chat"), orderBy("timestamp", "asc")),
    (messages) => {
      messages.forEach(async (res) => {
        const messages = await res.data();
        arr.push(messages as MessageType);
      });
    }
  );

  return arr;
};
export default getMessages;
