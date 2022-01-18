import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../types";

const getUserInfo = async (
  userId: string | null,
  setUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>
) => {
  const userInfo = await getDoc(doc(db, `users/${userId}`));

  if (userInfo.exists()) {
    if (setUser) {
      setUser(userInfo.data() as UserType);
    } else {
      return userInfo.data() as UserType;
    }
  } else {
    return null;
  }
};

export default getUserInfo;
