import { db } from "../firebase/firebaseConfig";
import { updateDoc, collection, getDocs, doc } from "firebase/firestore";

const likePost = (post: any, userId: string | null) => {
  getDocs(collection(db, "posts")).then((snapchot) => {
    snapchot.forEach(async (p) => {
      if (post.url === p.data().url && post.caption === p.data().caption) {
        const usersLiked: Array<string | null> = await p.data().usersLiked;
        const likes = p.data().likes;

        if (usersLiked.includes(userId)) {
          updateDoc(doc(db, `posts/${p.id}`), {
            likes: likes - 1,
            usersLiked: usersLiked.filter((e) => e !== userId),
          });
        } else {
          updateDoc(doc(db, `posts/${p.id}`), {
            likes: likes + 1,
            usersLiked: [...usersLiked, userId],
          });
        }
      }
    });
  });
};

export default likePost;
