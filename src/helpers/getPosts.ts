import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { PostType } from "../types";

const getPosts = async () => {
  let arr: Array<PostType> = [];

  await getDocs(
    query(collection(db, "posts"), orderBy("timestamp", "asc"))
  ).then((posts) => {
    posts.forEach(async (res) => {
      const post = await res.data();
      arr.push({ ...(post as PostType), id: res.id });
    });
  });

  return arr;
};

export default getPosts;
