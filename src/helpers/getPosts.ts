import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { async } from "@firebase/util";

interface PostType {
  user: string;
  url: string;
  caption: string;
}

const getPosts = async () => {
  let arr: Array<PostType> = [];
  await getDocs(query(collection(db, "posts"))).then((posts) => {
    posts.forEach(async (res) => {
      const post = await res.data();

      arr.push(post as PostType);
    });
  });
  return arr;
};

export default getPosts;
