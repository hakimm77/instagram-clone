import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const postComment = async (
  postId: string,
  userId: string | null,
  comment: string,
  oldComments: any,
  name: string | undefined
) => {
  updateDoc(doc(db, `posts/${postId}/`), {
    comments: [
      ...oldComments,
      {
        comment: comment,
        user: userId,
        name: name,
      },
    ],
  });
};

export default postComment;
