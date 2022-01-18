import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

interface CommentType {
  user: string;
  comment: string;
}

interface PostType {
  user: string;
  url: string;
  caption: string;
  likes: number;
  usersLiked: Array<string | null>;
  id: string;
  comments: Array<CommentType>;
}
const getPosts = async () => {
  let arr: Array<PostType> = [];

  await getDocs(query(collection(db, "posts"))).then((posts) => {
    posts.forEach(async (res) => {
      const post = await res.data();
      arr.push({ ...(post as PostType), id: res.id });
    });
  });

  return arr;
};

export default getPosts;
