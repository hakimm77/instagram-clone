import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

const getUsers = async () => {
  let arr: Array<UserType> = [];

  await getDocs(query(collection(db, "users"))).then((users) => {
    users.forEach(async (res) => {
      const post = await res.data();
      arr.push(post as UserType);
    });
  });

  return arr;
};

export default getUsers;
