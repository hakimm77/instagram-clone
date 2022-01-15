import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface UserType {
  email: string;
  id: string;
  name: string;
  profilePic: string;
}

const getUserInfo = async (
  userId: string,
  setUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>
) => {
  const userInfo = await getDoc(doc(db, `users/${userId}`));

  if (userInfo.exists()) {
    if (setUser) {
      setUser(userInfo.data() as UserType);
    } else {
      return userInfo.data();
    }
  }
};

export default getUserInfo;
