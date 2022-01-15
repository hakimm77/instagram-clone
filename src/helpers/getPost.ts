import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import React from "react";
import getUserInfo from "./getUserInfo";

interface CommentType {
  user: string;
  comment: string;
  name: string;
  id: string;
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

const getPost = async (
  id: string,
  setPost: React.Dispatch<React.SetStateAction<PostType | undefined>>
) => {
  let post: any;

  await getDoc(doc(db, `posts/${id}`)).then(async (docSnapchot) => {
    if (docSnapchot.exists()) {
      post = docSnapchot.data();
    } else {
      setPost(undefined);
      window.location.href = "/home";
    }
  });

  setPost(post as PostType);
};

export default getPost;
